/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';

import { formatDateToString, formatValueToCurrency, formatCurrencyToNumber } from '../../utils';
import { UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE } from './constants';
import { EXPENSE_ROUTE, INCOME_ROUTE } from '../../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../../pages/RoutesConstants';

import { SystemStateEnum } from '../../enums';
import {
  CreateExpenseValues, CreateIncomeValues,
} from '../../components/UI/Records/interface';
import { Expense, ExpenseLocalStorage, GeneralError } from '../../globalInterface';
import {
  UseRecordsProps, UpdateAmountAccountProps, ShowErrorNotificationProps,
  UpdateAmountAccountOnEditProps, EditIncomeProps, EditExpenseProps,
  UpdateTotalCurrencyProps,
  Actions,
  CreateTransferProps,
} from './interface';
import { UpdateAmountPayload } from '../../redux/slices/Accounts/interface';
import {
  DeleteRecordProps, EditExpenseValues, EditIncomeValues, UpdateRelatedExpensesValues, UpdateTotalExpenseIncomePayload,
} from '../../redux/slices/Records/interface';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDate } from '../useDate';
import { useNotification } from '../useNotification';
import {
  updateTotalExpense,
  updateTotalIncome,
  useDeleteRecordMutation,
  useCreateExpenseMutation,
  useEditExpenseMutation,
  useUpdatePaidMultipleExpensesMutation,
  useCreateIncomeMutation,
  useEditIncomeMutation,
  useCreateTransferMutation,
} from '../../redux/slices/Records';
import { useModifyAmountAccountMutation } from '../../redux/slices/Accounts/actions';
import { updateAmountSelectedAccount } from '../../redux/slices/Accounts/accounts.slice';

const useRecords = ({
  recordToBeDeleted, deleteRecordExpense, closeDeleteRecordModalCb = () => {}, closeDrawer = () => {},
}: UseRecordsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { updateGlobalNotification } = useNotification({});
  const [updateAmountAccountMutation] = useModifyAmountAccountMutation();
  const [deleteRecordMutation, { isLoading: loadingDeleteRecord }] = useDeleteRecordMutation();
  const [createExpenseMutation, { isLoading: isLoadingCreateExpense, isSuccess: isSucessCreateExpense }] = useCreateExpenseMutation();
  const [createIncomeMutation, { isLoading: isLoadingCreateIncome, isSuccess: isSucessCreateIncome }] = useCreateIncomeMutation();
  const [createTransferMutation, { isLoading: isLoadingCreateTransfer, isSuccess: isSuccessCreateTransfer }] = useCreateTransferMutation();
  const [editExpenseMutation, { isLoading: isLoadingEditExpense, isSuccess: isSucessEditExpense }] = useEditExpenseMutation();
  const [editIncomeMutation, { isLoading: isLoadingEditIncome, isSuccess: isSucessEditIncome }] = useEditIncomeMutation();
  const [updatePaidMultipleExpensesMutation] = useUpdatePaidMultipleExpensesMutation();

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const totalRecords = useAppSelector((state) => state.records.totalRecords);
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const { month: currentMonth, lastMonth } = useDate();

  const showErrorNotification = ({ errorMessage, action, goToDashboard = false }: ShowErrorNotificationProps) => {
    const actions: Actions = {
      create: 'creating',
      edit: 'editing',
    };
    const verb = actions[action.toLowerCase() as keyof typeof actions];
    updateGlobalNotification({
      newTitle: 'Error',
      newDescription: `Oops! An error ocurred while ${verb} the record. Try again later.`,
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
    amount, isExpense, accountId, deleteRecord = false,
  }: UpdateAmountAccountProps) {
    try {
      const amountToUpdate = (accounts ?? []).find((account) => account._id === accountId)?.amount as number;

      const payloadDeleteRecord = (isExpense)
        ? { accountId, amount: amountToUpdate + amount }
        : { accountId, amount: amountToUpdate - amount };
      const payloadCreateRecord = isExpense
        ? { accountId, amount: amountToUpdate - amount }
        : { accountId, amount: amountToUpdate + amount };

      const payload: UpdateAmountPayload = deleteRecord ? payloadDeleteRecord : payloadCreateRecord;
      const { data: { account: { amount: amountFetched } } } = await updateAmountAccountMutation({ payload, bearerToken }).unwrap();

      // dispatch update amount account
      dispatch(updateAmountSelectedAccount({ amount: amountFetched, accountId }));

      return UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE;
    } catch (err) {
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: 'Error while updating the amount fo the account',
        action: 'Create',
        goToDashboard: true,
      });
      return errorCatched?.data.message;
    }
  }

  const updateAmountAccountOnEditRecord = async ({
    amount, isExpense, previousAmount, accountId,
  }: UpdateAmountAccountOnEditProps) => {
    try {
      const amountToUpdate = (accounts ?? []).find((account) => account._id === accountId)?.amount as number;
      const newAccountId = accountId ?? selectedAccount?._id as string;
      const amountResultIncome = amountToUpdate - previousAmount + amount;
      const amountResultExpense = amountToUpdate + previousAmount - amount;
      const payload: UpdateAmountPayload = isExpense
        ? { accountId: newAccountId, amount: amountResultExpense }
        : { accountId: newAccountId, amount: amountResultIncome };

      const { data: { account: { amount: amountFetched } } } = await updateAmountAccountMutation({ payload, bearerToken }).unwrap();

      // dispatch update amount account
      dispatch(updateAmountSelectedAccount({ amount: amountFetched, accountId: newAccountId }));

      return UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE;
    } catch (err) {
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: 'Error while updating the amount fo the account',
        action: 'Create',
        goToDashboard: true,
      });
      return errorCatched.data.message;
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
    const newTotalCurrency = formatValueToCurrency({ amount: totalUpdated });
    const payload: UpdateTotalExpenseIncomePayload = { newAmount: newTotalCurrency, recordAgeCategory };
    return payload;
  };

  const createExpenseLocalStorage = (values: CreateExpenseValues) => {
    const { date, category, subCategory } = values;
    const dateFormatted = date.toISOString();
    const newId = window.crypto.randomUUID();
    const amountFormatted = formatValueToCurrency({ amount: values.amount });
    console.log('amoiuntFormatted', amountFormatted);
    // Find category
    // const category = {  }

    // const newExpense: ExpenseLocalStorage = {
    //   ...values, date: dateFormatted, _id: newId, amountFormatted, isPaid: false,
    // };
  };

  const createExpense = async (values: CreateExpenseValues) => {
    try {
      const { amount, date: dateValue, account } = values;
      const date = dateValue.toDate();

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await createExpenseMutation({ values, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmountAccountResponse = await updateAmountAccount({ amount, isExpense: true, accountId: account });
      // If there's an error while updating the account, return
      if (updateAmountAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Update amount of total records
      if (isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amount,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalExpense(payload));
      }

      if (isLastMonth) {
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
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Create',
        goToDashboard: true,
      });
    }
  };

  const createTransfer = async ({ valuesExpense, valuesIncome }: CreateTransferProps) => {
    try {
      const { amount: amountExpense, date: dateValue, account: accountExpense } = valuesExpense;
      const { amount: amountIncome, account: accountIncome } = valuesIncome;
      const date = dateValue.toDate();

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await createTransferMutation({ values: { expense: valuesExpense, income: valuesIncome }, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmountOriginAccountResponse = await updateAmountAccount({ amount: amountExpense, isExpense: true, accountId: accountExpense });
      // If there's an error while updating the account, return
      if (updateAmountOriginAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      const updateAmountDestinationAccountResponse = await updateAmountAccount({ amount: amountIncome, isExpense: false, accountId: accountIncome });
      if (updateAmountDestinationAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Update amount of total records
      if (isCurrentMonth) {
        const payloadExpense = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amountExpense,
          recordAgeCategory: 'Current Month',
        });
        const payloadIncome = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amountIncome,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalExpense(payloadExpense));
        dispatch(updateTotalIncome(payloadIncome));
      }

      if (isLastMonth) {
        const payloadExpense = updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.expenseTotal,
          newAmount: amountIncome,
          recordAgeCategory: 'Last month',
        });
        const payloadIncome = updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.incomeTotal,
          newAmount: amountIncome,
          recordAgeCategory: 'Last month',
        });
        dispatch(updateTotalExpense(payloadExpense));
        dispatch(updateTotalIncome(payloadIncome));
      }

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Transfer created',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    } catch (err) {
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Create',
        goToDashboard: true,
      });
    }
  };

  const editExpense = async ({
    values, recordId, amountTouched, previousAmount, userId, accountId,
  }: EditExpenseProps) => {
    try {
      const { amount, date: dateValue } = values;
      const date = dateValue.toDate();
      const newValues: EditExpenseValues = { ...values, recordId, userId };

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await editExpenseMutation({ values: newValues, bearerToken }).unwrap();
      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({
          amount, isExpense: true, previousAmount, accountId,
        });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      if (isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalExpense(payload));
      }

      if (isLastMonth) {
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
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Edit',
        goToDashboard: true,
      });
    }
  };

  const createIncome = async (values: CreateIncomeValues) => {
    try {
      const { amount, date: dateValue, account } = values;
      const date = dateValue.toDate();

      // Format date and determine if the record from what period is: currentMonth, lastMonth, older
      const { monthFormatted } = formatDateToString(date);
      const isLastMonth = lastMonth === monthFormatted;
      const isCurrentMonth = currentMonth === monthFormatted;

      await createIncomeMutation({ values, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmount = await updateAmountAccount({ amount, isExpense: false, accountId: account });
      // If there's an error while updating the account, return
      if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      // Update amount of total records
      if (isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amount,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalIncome(payload));
      }
      if (isLastMonth) {
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
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Create',
        goToDashboard: true,
      });
    }
  };

  const editIncome = async ({
    values, recordId, amountTouched, previousAmount, previousExpensesRelated, userId, accountId,
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
        const updateAmount = await updateAmountAccountOnEditRecord({
          amount, isExpense: false, previousAmount, accountId,
        });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      // Update amount of total records
      if (isCurrentMonth) {
        const payload = updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Current Month',
        });
        dispatch(updateTotalIncome(payload));
      }
      if (isLastMonth) {
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
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Edit',
        goToDashboard: true,
      });
    }
  };

  const deleteRecord = async ({ deleteTransfer }: { deleteTransfer?: boolean; }) => {
    try {
      const amountOfRecord = recordToBeDeleted?.amount as number;
      const recordId = recordToBeDeleted?._id as string;
      const accountRecord = recordToBeDeleted?.account as string;
      const valuesDeleteRecord: DeleteRecordProps = { recordId };
      const route = deleteRecordExpense ? EXPENSE_ROUTE : INCOME_ROUTE;

      await deleteRecordMutation({ values: valuesDeleteRecord, route, bearerToken });

      // Update Amount of the account.
      const updateAmount = await updateAmountAccount({
        amount: amountOfRecord, isExpense: deleteRecordExpense ?? false, deleteRecord: true, accountId: accountRecord,
      });
      // If there's an error while updating the account, return
      if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) {
        closeDeleteRecordModalCb();
        closeDrawer();
        return;
      }

      if (deleteTransfer) {
        const transferRecordId = recordToBeDeleted?.transferRecord?.transferId ?? '';
        const transferAccountId = recordToBeDeleted?.transferRecord?.account ?? '';
        const valuesTransferRecord: DeleteRecordProps = { recordId: transferRecordId };
        const transferRoute = deleteRecordExpense ? INCOME_ROUTE : EXPENSE_ROUTE;
        await deleteRecordMutation({ values: valuesTransferRecord, route: transferRoute, bearerToken });

        // Update Amount of the account.
        const updateAmountTransfer = await updateAmountAccount({
          amount: amountOfRecord, isExpense: !deleteRecordExpense ?? false, deleteRecord: true, accountId: transferAccountId,
        });
        // If there's an error while updating the account, return
        if (updateAmountTransfer !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) {
          closeDeleteRecordModalCb();
          closeDrawer();
          return;
        }
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
      const errorCatched = err as GeneralError;
      closeDeleteRecordModalCb();
      closeDrawer();
      // Show notification error
      showErrorNotification({
        errorMessage: errorCatched?.data.message ?? '',
        action: 'Delete',
        goToDashboard: true,
      });
    }
  };

  return {
    createExpense,
    editExpense,
    createIncome,
    editIncome,
    createTransfer,
    deleteRecord,
    loadingDeleteRecord,
    isLoadingCreateExpense,
    isLoadingCreateIncome,
    isLoadingCreateTransfer,
    isLoadingEditExpense,
    isLoadingEditIncome,
    isSucessCreateExpense,
    isSucessCreateIncome,
    isSuccessCreateTransfer,
    isSucessEditExpense,
    isSucessEditIncome,
  };
};

export { useRecords };
