/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { formatDateToString } from '../../utils';
import { EXPENSE_ROUTE, INCOME_ROUTE } from '../../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../../pages/RoutesConstants';
import {
  CreateExpenseValues, CreateIncomeValues, DeleteRecordResponse,
} from '../../components/UI/Records/interface';
import {
  allRecordsAtom,
} from '../../atoms';
import { useDate } from '../useDate';
import {
  UseRecordsProps, UpdateAmountAccountProps, ShowErrorNotificationProps,
  UpdateAmountAccountOnEditProps, UpdateRecordsOnDeleteProps, EditIncomeProps, EditExpenseProps,
} from './interface';
import { HttpRequestWithBearerToken } from '../../utils/HttpRequestWithBearerToken';
import { SystemStateEnum } from '../../enums';
import { useNotification } from '../useNotification';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateAmountAccountThunkFn } from '../../redux/slices/Accounts/actions/updateAmountAccount';
import { UpdateAmountPayload } from '../../redux/slices/Accounts/interface';
import { UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE } from './constants';
import { createExpenseThunkFn } from '../../redux/slices/Records/actions/Expenses/createExpense';
import { ERROR_MESSAGE_GENERAL } from '../../constants';
import { createIncomeThunkFn } from '../../redux/slices/Records/actions/Incomes/createIncome';
import { EditExpenseValues, EditIncomeValues, UpdateRelatedExpensesValues } from '../../redux/slices/Records/interface';
import { editExpenseThunkFn } from '../../redux/slices/Records/actions/Expenses/editExpense';
import { editIncomeThunkFn } from '../../redux/slices/Records/actions/Incomes/editIncome';
import { updateRelatedExpenses } from '../../redux/slices/Records/actions/Expenses/updateRelatedExpenses';

const useRecords = ({
  recordToBeDeleted, deleteRecordExpense, closeDeleteRecordModalCb = () => {}, closeDrawer = () => {},
}: UseRecordsProps) => {
  const { updateGlobalNotification } = useNotification({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as AxiosRequestHeaders;
  const { month: currentMonth, lastMonth } = useDate();

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

  async function updateAmountAccount({
    amount, isExpense, deleteRecord = false,
  }: UpdateAmountAccountProps) {
    try {
      const amountToUpdate = selectedAccount?.amount as number;
      const accountId = selectedAccount?._id as string;

      const payloadDeleteRecord = (isExpense)
        ? { accountId, amount: amountToUpdate + amount }
        : { accountId, amount: amountToUpdate - amount };
      const payloadCreateRecord = isExpense
        ? { accountId, amount: amountToUpdate - amount }
        : { accountId, amount: amountToUpdate + amount };

      const payload: UpdateAmountPayload = deleteRecord ? payloadDeleteRecord : payloadCreateRecord;
      await dispatch(updateAmountAccountThunkFn({ payload, bearerToken })).unwrap();
      return UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE;
    } catch (err) {
      const errorCatched = err as AxiosError;
      showErrorNotification({
        errorMessage: 'Error while updating the amount fo the account',
        action: 'Create',
        goToDashboard: true,
      });
      console.error(`Error while updating the account: ${errorCatched?.message}`);
      return errorCatched?.message;
    }
  }

  const updateAmountAccountOnEditRecord = async ({ amount, isExpense, previousAmount }: UpdateAmountAccountOnEditProps) => {
    try {
      const amountToUpdate = selectedAccount?.amount as number;
      const accountId = selectedAccount?._id as string;
      const amountResultIncome = amountToUpdate - previousAmount + amount;
      const amountResultExpense = amountToUpdate + previousAmount - amount;
      const payload: UpdateAmountPayload = isExpense
        ? { accountId, amount: amountResultExpense }
        : { accountId, amount: amountResultIncome };

      await dispatch(updateAmountAccountThunkFn({ payload, bearerToken })).unwrap();
      return UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE;
    } catch (err) {
      const errorCatched = err as AxiosError;
      showErrorNotification({
        errorMessage: 'Error while updating the amount fo the account',
        action: 'Create',
        goToDashboard: true,
      });
      console.error(`Error while updating the account: ${errorCatched?.message}`);
      return errorCatched?.message;
    }
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
    try {
      const { amount, date: dateValue } = values;
      const date = dateValue.toDate();

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await dispatch(createExpenseThunkFn({
        values, bearerToken, isLastMonth, isCurrentMonth,
      })).unwrap();

      // Update the amount of the account.
      const updateAmountAccountResponse = await updateAmountAccount({ amount, isExpense: true });
      // If there's an error while updating the account, return
      if (updateAmountAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record created',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Create',
        goToDashboard: true,
      });
      console.error('Error while creating expense', errorCatched.message);
    }
  };

  const editExpense = async ({
    values, recordId, amountTouched, previousAmount, userId,
  }: EditExpenseProps) => {
    try {
      const { amount, date: dateValue } = values;
      const date = dateValue.toDate();
      const newValues: EditExpenseValues = { ...values, recordId, userId };

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await dispatch(editExpenseThunkFn({
        values: newValues, bearerToken, isLastMonth, isCurrentMonth,
      })).unwrap();

      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({ amount, isExpense: true, previousAmount });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record updated',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Edit',
        goToDashboard: true,
      });
      console.error('Error while creating expense', errorCatched.message);
    }
  };

  const createIncome = async (values: CreateIncomeValues) => {
    try {
      const { amount, date: dateValue } = values;
      const date = dateValue.toDate();

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await dispatch(createIncomeThunkFn({
        values, bearerToken, isLastMonth, isCurrentMonth,
      })).unwrap();

      // Update the amount of the account.
      const updateAmount = await updateAmountAccount({ amount, isExpense: false });
      // If there's an error while updating the account, return
      if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record created',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Create',
        goToDashboard: true,
      });
      console.error('Error while creating expense', errorCatched.message);
    }
  };

  const editIncome = async ({
    values, recordId, amountTouched, previousAmount, previousExpensesRelated, userId,
  }: EditIncomeProps) => {
    try {
      const { amount, date: dateValue } = values;
      const date = dateValue.toDate();
      const newValues: EditIncomeValues = { ...values, recordId, userId };

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await dispatch(editIncomeThunkFn({
        values: newValues, bearerToken, isLastMonth, isCurrentMonth,
      })).unwrap();

      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({ amount, isExpense: false, previousAmount });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      // Set expenses as not paid to those that are removed from expenses related
      if (previousExpensesRelated.length > 0) {
        const payload: UpdateRelatedExpensesValues[] = previousExpensesRelated.map((expense) => ({
          recordId: expense._id,
          isPaid: false,
        }));

        await dispatch(updateRelatedExpenses({
          payload, bearerToken, isLastMonth, isCurrentMonth,
        })).unwrap();
      }

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record Updated',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      const errorCatched = err as AxiosError;
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Edit',
        goToDashboard: true,
      });
      console.error('Error while creating income', errorCatched.message);
    }
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
