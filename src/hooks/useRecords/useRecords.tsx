/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { formatDateToString, formatNumberToCurrency } from '../../utils';
import { EXPENSE_ROUTE, INCOME_ROUTE } from '../../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../../pages/RoutesConstants';
import {
  CreateExpenseValues, CreateIncomeValues,
} from '../../components/UI/Records/interface';
import { useDate } from '../useDate';
import {
  UseRecordsProps, UpdateAmountAccountProps, ShowErrorNotificationProps,
  UpdateAmountAccountOnEditProps, EditIncomeProps, EditExpenseProps,
  UpdateTotalCurrencyProps,
} from './interface';
import { SystemStateEnum } from '../../enums';
import { useNotification } from '../useNotification';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { UpdateAmountPayload } from '../../redux/slices/Accounts/interface';
import { UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE } from './constants';
import { ERROR_MESSAGE_GENERAL } from '../../constants';
import {
  DeleteRecordProps, EditExpenseValues, EditIncomeValues, UpdateRelatedExpensesValues, UpdateTotalExpenseIncomePayload,
} from '../../redux/slices/Records/interface';
import { updateTotalExpense, updateTotalIncome } from '../../redux/slices/Records/records.slice';
import { formatCurrencyToNumber } from '../../utils/FormatCurrencyToNumber/formatCurrencyToNumber';
import { useModifyAmountAccountMutation } from '../../redux/slices/Accounts/actions';
import { useDeleteRecordMutation } from '../../redux/slices/Records/actions/recordsApiSlice';
import {
  useCreateExpenseMutation,
  useEditExpenseMutation,
  useUpdatePaidMultipleExpensesMutation,
} from '../../redux/slices/Records/actions/expenses.api';
import { useCreateIncomeMutation, useEditIncomeMutation } from '../../redux/slices/Records/incomes.api';

const useRecords = ({
  recordToBeDeleted, deleteRecordExpense, closeDeleteRecordModalCb = () => {}, closeDrawer = () => {},
}: UseRecordsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { updateGlobalNotification } = useNotification({});
  const [updateAmountAccountMutation] = useModifyAmountAccountMutation();
  const [deleteRecordMutation, { isLoading: loadingDeleteRecord }] = useDeleteRecordMutation();
  const [createExpenseMutation] = useCreateExpenseMutation();
  const [createIncomeMutation] = useCreateIncomeMutation();
  const [editExpenseMutation] = useEditExpenseMutation();
  const [editIncomeMutation] = useEditIncomeMutation();
  const [updatePaidMultipleExpensesMutation] = useUpdatePaidMultipleExpensesMutation();

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const allRecords = useAppSelector((state) => state.records.allRecords);
  const totalRecords = useAppSelector((state) => state.records.totalRecords);
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
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
      await updateAmountAccountMutation({ payload, bearerToken }).unwrap();
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

      await updateAmountAccountMutation({ payload, bearerToken }).unwrap();
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

  const updateTotalCurrency = ({
    currentTotal, newAmount, recordAgeCategory, editRecord, previousAmount,
  }: UpdateTotalCurrencyProps): UpdateTotalExpenseIncomePayload => {
    const currentTotalNumber = formatCurrencyToNumber(currentTotal);
    let totalUpdated = 0;
    if (editRecord && previousAmount) {
      // Subtract previous amount and sum new amount.
      totalUpdated = currentTotalNumber - previousAmount + newAmount;
    } else {
      totalUpdated = currentTotalNumber + newAmount;
    }
    const newTotalCurrency = formatNumberToCurrency(totalUpdated);
    const payload: UpdateTotalExpenseIncomePayload = { newAmount: newTotalCurrency, recordAgeCategory };
    return payload;
  };

  const createExpense = async (values: CreateExpenseValues) => {
    try {
      const { amount, date: dateValue } = values;
      const date = dateValue.toDate();

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await createExpenseMutation({ values, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmountAccountResponse = await updateAmountAccount({ amount, isExpense: true });
      // If there's an error while updating the account, return
      if (updateAmountAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Update amount of total records
      if (!!allRecords.currentMonth && isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amount,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalExpense(payload));
      }

      if (!!allRecords.lastMonth && isLastMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.expenseTotal,
          newAmount: amount,
          recordAgeCategory: 'Last month',
        });
        dispatch(updateTotalExpense(payload));
      }

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record created',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Create',
        goToDashboard: true,
      });
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

      await editExpenseMutation({ values: newValues, bearerToken });
      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({ amount, isExpense: true, previousAmount });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      if (!!allRecords.currentMonth && isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalExpense(payload));
      }

      if (!!allRecords.lastMonth && isLastMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.expenseTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Last month',
        });
        dispatch(updateTotalExpense(payload));
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

      await createIncomeMutation({ values, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmount = await updateAmountAccount({ amount, isExpense: false });
      // If there's an error while updating the account, return
      if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Update amount of total records
      if (allRecords.currentMonth && isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amount,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalIncome(payload));
      }
      if (allRecords.lastMonth && isLastMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.incomeTotal,
          newAmount: amount,
          recordAgeCategory: 'Last month',
        });
        dispatch(updateTotalIncome(payload));
      }

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record created',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Create',
        goToDashboard: true,
      });
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

      await editIncomeMutation({ values: newValues, bearerToken }).unwrap();

      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({ amount, isExpense: false, previousAmount });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      // Update amount of total records
      if (allRecords.currentMonth && isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalIncome(payload));
      }
      if (allRecords.lastMonth && isLastMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.incomeTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Last month',
        });
        dispatch(updateTotalIncome(payload));
      }

      // Set expenses as not paid to those that are removed from expenses related
      if (previousExpensesRelated.length > 0) {
        const payload: UpdateRelatedExpensesValues[] = previousExpensesRelated.map((expense) => ({
          recordId: expense._id,
          isPaid: false,
        }));

        await updatePaidMultipleExpensesMutation({ values: payload, bearerToken });
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
    try {
      const amountOfRecord = recordToBeDeleted?.amount as number;
      const recordId = recordToBeDeleted?._id as string;
      const valuesDeleteRecord: DeleteRecordProps = { recordId };
      const route = deleteRecordExpense ? EXPENSE_ROUTE : INCOME_ROUTE;

      await deleteRecordMutation({ values: valuesDeleteRecord, route, bearerToken });

      // Update Amount of the account.
      const updateAmount = await updateAmountAccount({ amount: amountOfRecord, isExpense: deleteRecordExpense ?? false, deleteRecord: true });
      // If there's an error while updating the account, return
      if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) {
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
    } catch (err) {
      const errorCatched = err as AxiosError;
      closeDeleteRecordModalCb();
      closeDrawer();
      // Show notification error
      showErrorNotification({
        errorMessage: ERROR_MESSAGE_GENERAL,
        action: 'Delete',
        goToDashboard: true,
      });
      console.error('Error while deleting expense', errorCatched.message);
    }
  };

  return {
    createExpense,
    editExpense,
    createIncome,
    editIncome,
    deleteRecord,
    loadingDeleteRecord,
  };
};

export { useRecords };
