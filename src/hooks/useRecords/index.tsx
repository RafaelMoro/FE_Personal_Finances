/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { formatDateToString, postRequestWithBearer } from '../../utils';
import { POST_DELETE_EXPENSE_ROUTE, POST_DELETE_INCOME_ROUTE } from '../../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../../pages/RoutesConstants';
import {
  CreateExpenseResponse, CreateExpenseValues, CreateIncomeValues, CreateIncomeResponse, DeleteRecordResponse,
} from '../../components/UI/Records/interface';
import {
  accountsUIAtom,
  allRecordsAtom, selectedAccountAtom, userAtom,
} from '../../atoms';
import { useDate } from '../useDate';
import {
  UseRecordsProps, UpdateAmountAccountProps, ShowErrorNotificationProps, UpdateRecordsProps,
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
    const amountToNumber = Number(amount.slice(1, amount.length));
    const amountToUpdate = selectedAccount?.amount as number;
    const accountId = selectedAccount?._id as string;

    const payloadDeleteRecord = (isExpense)
      ? { accountId, amount: amountToUpdate + amountToNumber }
      : { accountId, amount: amountToUpdate - amountToNumber };
    const payloadCreateRecord = isExpense
      ? { accountId, amount: amountToUpdate - amountToNumber }
      : { accountId, amount: amountToUpdate + amountToNumber };
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

  const updateAllRecords = ({
    date, newRecord, deleteRecord = false, deletedRecordId = '',
  }: UpdateRecordsProps) => {
    const { monthFormatted } = formatDateToString(date);
    if (lastMonth === monthFormatted) {
      if (deleteRecord) {
        const filteredRecords = allRecords.lastMonth.filter((record) => record._id !== deletedRecordId);
        setAllRecords({ ...allRecords, lastMonth: filteredRecords });
        return;
      }

      if (newRecord) {
        const recordsUpdated = [...allRecords.lastMonth, newRecord];
        setAllRecords({ ...allRecords, lastMonth: recordsUpdated });
        return;
      }
    }

    if (currentMonth === monthFormatted) {
      if (deleteRecord) {
        const filteredRecords = allRecords.currentMonth.filter((record) => record._id !== deletedRecordId);
        setAllRecords({ ...allRecords, currentMonth: filteredRecords });
        return;
      }

      if (newRecord) {
        const recordsUpdated = [...allRecords.currentMonth, newRecord];
        setAllRecords({ ...allRecords, currentMonth: recordsUpdated });
        return;
      }
    }

    if (deleteRecord) {
      const filteredRecords = allRecords.olderRecords.filter((record) => record._id !== deletedRecordId);
      setAllRecords({ ...allRecords, olderRecords: filteredRecords });
      return;
    }
    if (newRecord) {
      const recordsUpdated = [...allRecords.olderRecords, newRecord];
      setAllRecords({ ...allRecords, olderRecords: recordsUpdated });
    }
  };

  const handleSubmitExpense = async (values: CreateExpenseValues) => {
    const { amount, date } = values;
    const createExpenseInfo: CreateExpenseResponse = await postRequestWithBearer(values, POST_DELETE_EXPENSE_ROUTE, bearerToken);

    // If an error is catched:
    if (createExpenseInfo?.message) {
      // Show notification error
      showErrorNotification({
        errorMessage: `There is an error: ${createExpenseInfo?.message}`,
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

    // Update expenses
    updateAllRecords({ date, newRecord: createExpenseInfo });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const handleSubmitIncome = async (values: CreateIncomeValues) => {
    const { amount, date } = values;
    const createIncomeInfo: CreateIncomeResponse = await postRequestWithBearer(values, POST_DELETE_INCOME_ROUTE, bearerToken);

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

    // Update incomes
    updateAllRecords({ date, newRecord: createIncomeInfo });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const deleteRecord = async () => {
    const amountOfRecord = recordToBeDeleted?.amount as string;
    const dateString = recordToBeDeleted?.date as Date;
    const date = new Date(dateString);
    const recordId = recordToBeDeleted?._id as string;

    const valuesDeleteRecord = { recordId };
    const route = deleteRecordExpense ? POST_DELETE_EXPENSE_ROUTE : POST_DELETE_INCOME_ROUTE;
    const responseDeleteRecord: DeleteRecordResponse = await HttpRequestWithBearerToken(
      valuesDeleteRecord,
      route,
      'delete',
      bearerToken,
    );

    if (responseDeleteRecord.error) {
      // mostrar notification
      showErrorNotification({
        errorMessage: `Error while deleting record: ${responseDeleteRecord.error}`,
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
    updateAllRecords({ date, deletedRecordId: recordId });
  };

  return {
    handleSubmitExpense,
    handleSubmitIncome,
    deleteRecord,
  };
};

export { useRecords };
