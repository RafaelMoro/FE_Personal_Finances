/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { formatDateToString, postRequestWithBearer } from '../../utils';
import { EXPENSE_ROUTE, INCOME_ROUTE, UPDATE_MULTIPLE_EXPENSES } from '../../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../../pages/RoutesConstants';
import {
  CreateEditExpenseResponse, CreateExpenseValues, CreateIncomeValues, CreateIncomeResponse, DeleteRecordResponse,
} from '../../components/UI/Records/interface';
import {
  accountsUIAtom,
  allRecordsAtom, selectedAccountAtom, userAtom,
} from '../../atoms';
import { useDate } from '../useDate';
import {
  UseRecordsProps, UpdateAmountAccountProps, ShowErrorNotificationProps, UpdateRecordsOnCreateProps,
  UpdateAmountAccountOnEditProps, UpdateRecordsOnDeleteProps, UpdateRecordsOnEditProps, EditIncomeProps, EditExpenseProps,
} from './interface';
import { HttpRequestWithBearerToken } from '../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../components/UI/Account/constants';
import { SystemStateEnum } from '../../enums';
import { useNotification } from '../useNotification';

const useRecords = ({
  recordToBeDeleted, deleteRecordExpense, closeDeleteRecordModalCb = () => {}, closeDrawer = () => {},
}: UseRecordsProps) => {
  const { updateGlobalNotification } = useNotification({});
  const navigate = useNavigate();

  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const [accountsUI, setAccountsUI] = useAtom(accountsUIAtom);
  const [user] = useAtom(userAtom);
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const { month: currentMonth, lastMonth } = useDate();

  const updateAmountAccount = async ({
    amount, isExpense, deleteRecord = false,
  }: UpdateAmountAccountProps) => {
    const amountToUpdate = selectedAccount?.amount as number;
    const accountId = selectedAccount?._id as string;

    const payloadDeleteRecord = (isExpense)
      ? { accountId, amount: amountToUpdate + amount }
      : { accountId, amount: amountToUpdate - amount };
    const payloadCreateRecord = isExpense
      ? { accountId, amount: amountToUpdate - amount }
      : { accountId, amount: amountToUpdate + amount };
    const payload = deleteRecord ? payloadDeleteRecord : payloadCreateRecord;

    const updateAccountResponse = await HttpRequestWithBearerToken(payload, POST_PUT_ACCOUNT_ROUTE, 'put', bearerToken);

    if (updateAccountResponse?.error) {
      return `Error: ${updateAccountResponse?.error}`;
    }

    // Update selected account amount.
    const { amount: newAmount } = payload;
    if (selectedAccount) setSelectedAccount({ ...selectedAccount, amount: newAmount });
    const accountsModified = accountsUI.map((account) => {
      if (account._id === accountId && selectedAccount) {
        return { ...selectedAccount, amount: newAmount };
      }
      return account;
    });
    setAccountsUI(accountsModified);
    return 'Account updated';
  };

  const updateAmountAccountOnEditRecord = async ({ amount, isExpense, previousAmount }: UpdateAmountAccountOnEditProps) => {
    const amountToUpdate = selectedAccount?.amount as number;
    const accountId = selectedAccount?._id as string;
    const amountResultIncome = amountToUpdate - previousAmount + amount;
    const amountResultExpense = amountToUpdate + previousAmount - amount;
    const payload = isExpense
      ? { accountId, amount: amountResultExpense }
      : { accountId, amount: amountResultIncome };

    const updateAccountResponse = await HttpRequestWithBearerToken(payload, POST_PUT_ACCOUNT_ROUTE, 'put', bearerToken);

    if (updateAccountResponse?.error) {
      return `Error: ${updateAccountResponse?.error}`;
    }

    // Update selected account amount.
    const { amount: newAmount } = payload;
    if (selectedAccount) setSelectedAccount({ ...selectedAccount, amount: newAmount });
    const accountsModified = accountsUI.map((account) => {
      if (account._id === accountId && selectedAccount) {
        return { ...selectedAccount, amount: newAmount };
      }
      return account;
    });
    setAccountsUI(accountsModified);
    return 'Account updated';
  };

  const showErrorNotification = ({ errorMessage, action, goToDashboard = false }: ShowErrorNotificationProps) => {
    updateGlobalNotification({
      newTitle: `${action} Record: Error`,
      newDescription: 'Oops! An error ocurred. Try again later.',
      newStatus: SystemStateEnum.Error,
    });
    console.error(`Error while submitting ${action} record: ${errorMessage}`);

    if (goToDashboard) {
      // Navigate to dashboard
      setTimeout(() => {
        navigate(DASHBOARD_ROUTE);
      }, 3000);
    }
  };

  // Fn used to update allRecords atom when a record is created.
  const updateAllRecordsOnCreate = ({
    date, newRecord,
  }: UpdateRecordsOnCreateProps) => {
    const { monthFormatted } = formatDateToString(date);
    if (lastMonth === monthFormatted) {
      const recordsUpdated = [...allRecords.lastMonth, newRecord];
      setAllRecords({ ...allRecords, lastMonth: recordsUpdated });
      return;
    }

    if (currentMonth === monthFormatted) {
      const recordsUpdated = [...allRecords.currentMonth, newRecord];
      setAllRecords({ ...allRecords, currentMonth: recordsUpdated });
      return;
    }
    const recordsUpdated = [...allRecords.olderRecords, newRecord];
    setAllRecords({ ...allRecords, olderRecords: recordsUpdated });
  };

  // Fn used to update allRecords atom when a record is edited.
  const updateAllRecordsOnEdit = ({ date, recordEdited }: UpdateRecordsOnEditProps) => {
    const { monthFormatted } = formatDateToString(date);
    const recordEditedId = recordEdited._id;
    if (lastMonth === monthFormatted) {
      const filteredRecords = allRecords.lastMonth.filter((record) => record._id !== recordEditedId);
      filteredRecords.push(recordEdited);
      setAllRecords({ ...allRecords, lastMonth: filteredRecords });
      return;
    }

    if (currentMonth === monthFormatted) {
      const filteredRecords = allRecords.lastMonth.filter((record) => record._id !== recordEditedId);
      filteredRecords.push(recordEdited);
      setAllRecords({ ...allRecords, currentMonth: filteredRecords });
      return;
    }

    const filteredRecords = allRecords.lastMonth.filter((record) => record._id !== recordEditedId);
    filteredRecords.push(recordEdited);
    setAllRecords({ ...allRecords, olderRecords: filteredRecords });
  };

  // Fn used to update allRecords atom when a record is deleted.
  const updateAllRecordsOnDelete = ({ date, deletedRecordId }: UpdateRecordsOnDeleteProps) => {
    const { monthFormatted } = formatDateToString(date);

    if (lastMonth === monthFormatted) {
      const filteredRecords = allRecords.lastMonth.filter((record) => record._id !== deletedRecordId);
      setAllRecords({ ...allRecords, lastMonth: filteredRecords });
      return;
    }

    if (currentMonth === monthFormatted) {
      const filteredRecords = allRecords.currentMonth.filter((record) => record._id !== deletedRecordId);
      setAllRecords({ ...allRecords, currentMonth: filteredRecords });
      return;
    }

    const filteredRecords = allRecords.olderRecords.filter((record) => record._id !== deletedRecordId);
    setAllRecords({ ...allRecords, olderRecords: filteredRecords });
  };

  const createExpense = async (values: CreateExpenseValues) => {
    const { amount, date: dateValue } = values;
    const date = dateValue.toDate();
    const expenseResponse: CreateEditExpenseResponse = await postRequestWithBearer(values, EXPENSE_ROUTE, bearerToken);

    // If an error is catched:
    if (expenseResponse?.message) {
      // Show notification error
      showErrorNotification({
        errorMessage: `There is an error: ${expenseResponse?.message}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    const updateAmount = await updateAmountAccount({ amount, isExpense: true });
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification({
        errorMessage: `Updating amount error: ${updateAmount}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record created',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Update expenses
    updateAllRecordsOnCreate({ date, newRecord: expenseResponse });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const editExpense = async ({
    values, recordId, amountTouched, previousAmount, userId,
  }: EditExpenseProps) => {
    const { amount, date: dateValue } = values;
    const newValues = { ...values, recordId, userId };
    const date = dateValue.toDate();
    const expenseResponse: CreateEditExpenseResponse = await HttpRequestWithBearerToken(
      newValues,
      EXPENSE_ROUTE,
      'put',
      bearerToken,
    );

    // If an error is catched:
    if (expenseResponse?.message) {
      // Show notification error
      showErrorNotification({
        errorMessage: `There is an error: ${expenseResponse?.message}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    if (amountTouched) {
      const updateAmount = await updateAmountAccountOnEditRecord({ amount, isExpense: true, previousAmount });
      if (updateAmount.includes('Error')) {
        // show notification error
        showErrorNotification({
          errorMessage: `Updating amount error: ${updateAmount}`,
          action: 'Create',
          goToDashboard: true,
        });
        return;
      }
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record updated',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Update expenses
    updateAllRecordsOnEdit({ date, recordEdited: expenseResponse });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const createIncome = async (values: CreateIncomeValues) => {
    const { amount, date: dateValue } = values;
    const date = dateValue.toDate();
    const createIncomeInfo: CreateIncomeResponse = await postRequestWithBearer(values, INCOME_ROUTE, bearerToken);

    // If an error is catched:
    if (createIncomeInfo?.message) {
      // Show notification error
      showErrorNotification({
        errorMessage: `There is an error: ${createIncomeInfo?.message}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    const updateAmount = await updateAmountAccount({ amount, isExpense: false });
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification({
        errorMessage: `Updating amount error: ${updateAmount}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record created',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Update incomes
    updateAllRecordsOnCreate({ date, newRecord: createIncomeInfo });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const editIncome = async ({
    values, recordId, amountTouched, previousAmount, previousExpensesRelated,
  }: EditIncomeProps) => {
    const { amount, date: dateValue } = values;
    const newValues = { ...values, recordId };
    const date = dateValue.toDate();
    const expenseResponse: CreateEditExpenseResponse = await HttpRequestWithBearerToken(
      newValues,
      INCOME_ROUTE,
      'put',
      bearerToken,
    );

    // If an error is catched:
    if (expenseResponse?.message) {
      // Show notification error
      showErrorNotification({
        errorMessage: `There is an error editing the income: ${expenseResponse?.message}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    if (amountTouched) {
      const updateAmount = await updateAmountAccountOnEditRecord({ amount, isExpense: false, previousAmount });
      if (updateAmount.includes('Error')) {
        // show notification error
        showErrorNotification({
          errorMessage: `Updating amount error: ${updateAmount}`,
          action: 'Create',
          goToDashboard: true,
        });
        return;
      }
    }

    if (previousExpensesRelated.length > 0) {
      const payload = previousExpensesRelated.map((expense) => ({
        recordId: expense._id,
        isPaid: false,
      }));
      const expensesUpdated = await HttpRequestWithBearerToken(
        payload,
        UPDATE_MULTIPLE_EXPENSES,
        'put',
        bearerToken,
      );

      if (expensesUpdated?.message) {
        // Show notification error
        showErrorNotification({
          errorMessage: `There is an error updating expenses: ${expenseResponse?.message}`,
          action: 'Create',
          goToDashboard: true,
        });
        return;
      }
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record Updated',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Update expenses
    updateAllRecordsOnEdit({ date, recordEdited: expenseResponse });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const deleteRecord = async () => {
    const amountOfRecord = recordToBeDeleted?.amount as number;
    const dateString = recordToBeDeleted?.date as Date;
    const date = new Date(dateString);
    const recordId = recordToBeDeleted?._id as string;

    const valuesDeleteRecord = { recordId };
    const route = deleteRecordExpense ? EXPENSE_ROUTE : INCOME_ROUTE;
    const responseDeleteRecord: DeleteRecordResponse = await HttpRequestWithBearerToken(
      valuesDeleteRecord,
      route,
      'delete',
      bearerToken,
    );

    if (responseDeleteRecord.message) {
      // Show error notification
      showErrorNotification({
        errorMessage: `Error while deleting record: ${responseDeleteRecord}`,
        action: 'Delete',
      });
      closeDeleteRecordModalCb();
      closeDrawer();
      return;
    }

    // Update Amount of the account.
    const updateAmount = await updateAmountAccount({ amount: amountOfRecord, isExpense: deleteRecordExpense ?? false, deleteRecord: true });
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification({
        errorMessage: `Error updating amount while deleting record: ${updateAmount}`,
        action: 'Delete',
      });
      closeDeleteRecordModalCb();
      closeDrawer();
      return;
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record Deleted Succesfully',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });
    closeDeleteRecordModalCb();
    closeDrawer();
    // Update Records
    updateAllRecordsOnDelete({ date, deletedRecordId: recordId });
  };

  return {
    createExpense,
    editExpense,
    createIncome,
    editIncome,
    deleteRecord,
  };
};

export { useRecords };
