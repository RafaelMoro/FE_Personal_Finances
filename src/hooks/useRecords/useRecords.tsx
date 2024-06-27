/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';

import {
  formatDateToString, formatValueToCurrency, formatCurrencyToNumber, addToLocalStorage,
  sortByDate,
} from '../../utils';
import { UPDATE_AMOUNT_ACCOUNT_LOCAL_SUCCESS_RESPONSE, UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE } from './constants';
import { EXPENSE_ROUTE, INCOME_ROUTE } from '../../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../../pages/RoutesConstants';

import { SystemStateEnum } from '../../enums';
import {
  CreateExpenseValues, CreateIncomeValues,
} from '../../components/UI/Records/interface';
import {
  Category, ExpensePaid, ExpensePaidRedux, GeneralError, RecordRedux,
  TypeOfRecord,
} from '../../globalInterface';
import {
  UseRecordsProps, UpdateAmountAccountProps, ShowErrorNotificationProps,
  UpdateAmountAccountOnEditProps, EditIncomeProps, EditExpenseProps,
  UpdateTotalCurrencyProps,
  Actions,
  CreateTransferProps,
  GetNewRecordsClassifiedByAgeProps,
  GetRecordAgeStatusResponse,
  TransferRecordInfo,
} from './interface';
import { UpdateAmountPayload } from '../../redux/slices/Accounts/interface';
import {
  DeleteRecordProps, EditExpenseValues, EditIncomeValues, UpdateRelatedExpensesValues, UpdateTotalExpenseIncomePayload,
} from '../../redux/slices/Records/interface';
import { useModifyAmountAccountMutation } from '../../redux/slices/Accounts/actions';
import { updateAmountSelectedAccount, updateAmountSelectedAccountLocalStorage } from '../../redux/slices/Accounts/accounts.slice';
import { GUEST_USER_ID } from '../useGuestUser/constants';
import { RecordsLocalStorage } from '../../utils/LocalStorage/interface';
import { isCreateExpense, updateEditedRecordStatus, updateRecordPaymentStatus } from './utils';

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
  saveRecordsLocalStorage,
  saveRecordsLocalStorageSelectedAccount,
} from '../../redux/slices/Records';

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
  const categoriesLocalStorage = useAppSelector((state) => state.categories.categoriesLocalStorage);
  const recordsLocalStorage = useAppSelector((state) => state.records.recordsLocalStorage);
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
    amount, isExpense, accountId, isGuestUser = false, deleteRecord = false,
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
      if (isGuestUser) {
        // Will update redux and local storage
        dispatch(updateAmountSelectedAccountLocalStorage({ amount: payload.amount, accountId }));
        return UPDATE_AMOUNT_ACCOUNT_LOCAL_SUCCESS_RESPONSE;
      }

      await updateAmountAccountMutation({ payload, bearerToken }).unwrap();
      // dispatch update amount account
      dispatch(updateAmountSelectedAccount({ amount: payload.amount, accountId }));

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
    amount, isExpense, previousAmount, accountId, isGuestUser = false,
  }: UpdateAmountAccountOnEditProps) => {
    try {
      const amountToUpdate = (accounts ?? []).find((account) => account._id === accountId)?.amount as number;
      const newAccountId = accountId ?? selectedAccount?._id as string;
      const amountResultIncome = amountToUpdate - previousAmount + amount;
      const amountResultExpense = amountToUpdate + previousAmount - amount;
      const payload: UpdateAmountPayload = isExpense
        ? { accountId: newAccountId, amount: amountResultExpense }
        : { accountId: newAccountId, amount: amountResultIncome };

      if (isGuestUser) {
        // Will update redux and local storage
        dispatch(updateAmountSelectedAccountLocalStorage({ amount: payload.amount, accountId }));
        return UPDATE_AMOUNT_ACCOUNT_LOCAL_SUCCESS_RESPONSE;
      }

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

  const getMonthDetails = (date: Date) => {
    const { monthFormatted } = formatDateToString(date);
    const isLastMonth = lastMonth === monthFormatted;
    const isCurrentMonth = currentMonth === monthFormatted;

    return {
      isLastMonth,
      isCurrentMonth,
    };
  };

  const updateTotalsExpense = ({
    date, amount, edit = false, previousAmount,
  }: { date: Date, amount: number, edit?: boolean, previousAmount?: number }) => {
    const { isLastMonth, isCurrentMonth } = getMonthDetails(date);

    if (isCurrentMonth) {
      const payload = edit
        ? updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Current Month',
        })
        : updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.expenseTotal,
          newAmount: amount,
          recordAgeCategory: 'Current Month',
        });
      dispatch(updateTotalExpense(payload));
    }

    if (isLastMonth) {
      const payload = edit
        ? updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.expenseTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Last month',
        })
        : updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.expenseTotal,
          newAmount: amount,
          recordAgeCategory: 'Last month',
        });
      dispatch(updateTotalExpense(payload));
    }
  };

  const updateTotalsIncome = ({
    date, amount, edit = false, previousAmount,
  }: { date: Date, amount: number, edit?: boolean, previousAmount?: number }) => {
    const { isLastMonth, isCurrentMonth } = getMonthDetails(date);

    if (isCurrentMonth) {
      const payload = edit
        ? updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Current Month',
        })
        : updateTotalCurrency({
          currentTotal: totalRecords.currentMonth.incomeTotal,
          newAmount: amount,
          recordAgeCategory: 'Current Month',
        });
      dispatch(updateTotalIncome(payload));
    }
    if (isLastMonth) {
      const payload = edit
        ? updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.incomeTotal,
          newAmount: amount,
          previousAmount,
          editRecord: true,
          recordAgeCategory: 'Last month',
        })
        : updateTotalCurrency({
          currentTotal: totalRecords.lastMonth.incomeTotal,
          newAmount: amount,
          recordAgeCategory: 'Last month',
        });
      dispatch(updateTotalIncome(payload));
    }
  };

  const getRecordAgeStatus = (date: Date): GetRecordAgeStatusResponse => {
    // Get month details
    const { isLastMonth, isCurrentMonth } = getMonthDetails(date);
    // Evaluate if the record is from the current month or last month or older
    if (isCurrentMonth) {
      return {
        recordAgeStatusKey: 'currentMonth',
        missingStatus: ['lastMonth', 'olderRecords'],
      };
    }
    if (isLastMonth) {
      return {
        recordAgeStatusKey: 'lastMonth',
        missingStatus: ['currentMonth', 'olderRecords'],
      };
    }
    return {
      recordAgeStatusKey: 'olderRecords',
      missingStatus: ['currentMonth', 'lastMonth'],
    };
  };

  const getNewRecordsClassifiedByAge = ({
    newRecord, newRecords, recordLocalStorage, recordAgeStatusKey,
  }: GetNewRecordsClassifiedByAgeProps): RecordsLocalStorage => {
    if (recordAgeStatusKey === 'currentMonth') {
      return {
        account: newRecord.account,
        records: {
          currentMonth: newRecords,
          lastMonth: recordLocalStorage.records.lastMonth,
          olderRecords: recordLocalStorage.records.olderRecords,
        },
      };
    }
    if (recordAgeStatusKey === 'lastMonth') {
      return {
        account: newRecord.account,
        records: {
          currentMonth: recordLocalStorage.records.currentMonth,
          lastMonth: newRecords,
          olderRecords: recordLocalStorage.records.olderRecords,
        },
      };
    }
    return {
      account: newRecord.account,
      records: {
        currentMonth: recordLocalStorage.records.currentMonth,
        lastMonth: recordLocalStorage.records.lastMonth,
        olderRecords: newRecords,
      },
    };
  };

  const formatCreateLocalRecord = ({
    values, category,
  }: { values: CreateExpenseValues | CreateIncomeValues, category: Category, }) => {
    const { date, subCategory } = values;
    const expensesPaid = (values as CreateIncomeValues)?.expensesPaid;
    const { formattedTime, fullDate } = formatDateToString(date.toDate());
    const dateFormatted = date.toISOString();
    const newId = window.crypto.randomUUID();

    const amountFormatted = formatValueToCurrency({ amount: values.amount });
    if (isCreateExpense(values)) {
      const newExpense: RecordRedux = {
        ...(values as CreateExpenseValues),
        date: dateFormatted,
        _id: newId,
        amountFormatted,
        isPaid: false,
        category,
        subCategory,
        userId: GUEST_USER_ID,
        typeOfRecord: 'expense',
        formattedTime,
        fullDate,
      };
      return newExpense;
    }

    if (expensesPaid.length > 0) {
      const newExpensesRelated: ExpensePaidRedux[] = expensesPaid.map((rec) => ({ ...rec, date: rec.date.toISOString() }));
      const newIncome: RecordRedux = {
        ...(values as CreateIncomeValues),
        date: dateFormatted,
        _id: newId,
        amountFormatted,
        category,
        subCategory,
        userId: GUEST_USER_ID,
        typeOfRecord: 'income',
        expensesPaid: newExpensesRelated,
        formattedTime,
        fullDate,
      };
      return newIncome;
    }

    const newIncome: RecordRedux = {
      ...(values as CreateIncomeValues),
      date: dateFormatted,
      _id: newId,
      amountFormatted,
      expensesPaid: [],
      category,
      subCategory,
      userId: GUEST_USER_ID,
      typeOfRecord: 'income',
      formattedTime,
      fullDate,
    };
    return newIncome;
  };

  const formatCreateTransfer = ({
    income, expense, category,
  }: { income: CreateIncomeValues, expense: CreateExpenseValues, category: Category }) => {
    const { date, subCategory } = expense;
    const expensesPaid = (income as CreateIncomeValues)?.expensesPaid;
    const { formattedTime, fullDate } = formatDateToString(date.toDate());
    const dateFormatted = date.toISOString();
    const expenseId = window.crypto.randomUUID();
    const incomeId = window.crypto.randomUUID();

    const amountFormatted = formatValueToCurrency({ amount: expense.amount });

    const newExpense: RecordRedux = {
      ...(expense as CreateExpenseValues),
      transferRecord: {
        transferId: incomeId,
        account: income.account,
      },
      date: dateFormatted,
      _id: expenseId,
      amountFormatted,
      isPaid: false,
      category,
      subCategory,
      userId: GUEST_USER_ID,
      typeOfRecord: 'transfer',
      formattedTime,
      fullDate,
    };

    if (expensesPaid.length > 0) {
      const newExpensesRelated: ExpensePaidRedux[] = expensesPaid.map((rec) => ({ ...rec, date: rec.date.toISOString() }));
      const incomeWithExpenses: RecordRedux = {
        ...(income as CreateIncomeValues),
        transferRecord: {
          transferId: expenseId,
          account: expense.account,
        },
        date: dateFormatted,
        _id: incomeId,
        amountFormatted,
        category,
        subCategory,
        userId: GUEST_USER_ID,
        typeOfRecord: 'transfer',
        expensesPaid: newExpensesRelated,
        formattedTime,
        fullDate,
      };
      return { expense: newExpense, income: incomeWithExpenses };
    }

    const newIncome: RecordRedux = {
      ...(income as CreateIncomeValues),
      transferRecord: {
        transferId: expenseId,
        account: expense.account,
      },
      expensesPaid: [],
      date: dateFormatted,
      _id: incomeId,
      amountFormatted,
      category,
      subCategory,
      userId: GUEST_USER_ID,
      typeOfRecord: 'transfer',
      formattedTime,
      fullDate,
    };

    return { expense: newExpense, income: newIncome };
  };

  const formatEditLocalRecord = (payload: EditExpenseProps, category: Category) => {
    const { values, recordId, userId } = payload;
    const { date } = values;
    const expensesPaid = (values as CreateIncomeValues)?.expensesPaid;
    const { formattedTime, fullDate } = formatDateToString(date.toDate());
    const amountFormatted = formatValueToCurrency({ amount: values.amount });

    if (isCreateExpense(values)) {
      const newExpense: RecordRedux = {
        ...values,
        _id: recordId,
        category,
        userId,
        date: date.toISOString(),
        formattedTime,
        fullDate,
        amountFormatted,
        typeOfRecord: 'expense',
        expensesPaid: undefined,
      };
      return newExpense;
    }

    const newIncome: RecordRedux = {
      ...(values as CreateIncomeValues),
      _id: recordId,
      category,
      userId,
      date: date.toISOString(),
      formattedTime,
      fullDate,
      amountFormatted,
      expensesPaid: [],
      typeOfRecord: 'income',
    };

    if (expensesPaid && expensesPaid.length > 0) {
      const newExpensesRelated: ExpensePaidRedux[] = expensesPaid.map((rec) => ({ ...rec, date: rec.date.toISOString() }));
      const incomeFormatted: RecordRedux = {
        ...newIncome,
        expensesPaid: newExpensesRelated,
      };
      return incomeFormatted;
    }
    return newIncome;
  };

  const getLocalRecordsOrderedOnEdit = ({
    account, date, recordId, editedRecord, transferInfo,
  }
  : { account: string, date: Date, recordId: string, editedRecord: RecordRedux, transferInfo?: TransferRecordInfo }) => {
    const recordLocalStorage = (recordsLocalStorage ?? []).find((record) => record.account === account);
    if (!recordLocalStorage) {
      return null;
    }
    const transferTypeOfRecord: TypeOfRecord = 'transfer';
    const updatedEditedRecord = transferInfo ? { ...editedRecord, transferRecord: transferInfo, typeOfRecord: transferTypeOfRecord } : editedRecord;
    const { recordAgeStatusKey, missingStatus } = getRecordAgeStatus(date);
    const recordsFiltered = recordLocalStorage.records[recordAgeStatusKey].filter((rec) => rec._id !== recordId);
    const newRecords: RecordRedux[] = [...recordsFiltered, updatedEditedRecord].sort(sortByDate);
    return {
      newRecords,
      recordAgeStatusKey,
      missingStatus,
      recordLocalStorage,
    };
  };

  const updateStoreStorageOnEditLocalRecord = ({ account, newRecords }: { account: string, newRecords: RecordsLocalStorage }) => {
    const filteredRecordsWithoutCurrentAccount = (recordsLocalStorage ?? []).filter((record) => record.account !== account);
    if (!filteredRecordsWithoutCurrentAccount) {
      return null;
    }
    filteredRecordsWithoutCurrentAccount.push(newRecords);
    dispatch(saveRecordsLocalStorage(filteredRecordsWithoutCurrentAccount));
    dispatch(saveRecordsLocalStorageSelectedAccount(newRecords));
    addToLocalStorage({ newInfo: filteredRecordsWithoutCurrentAccount, prop: 'records' });

    return 'Redux state and local storage updated';
  };

  const getRecordsLocalStorageInfo = ({
    newRecord, isIncome, date,
  }: { newRecord: RecordRedux, date: Date, isIncome?: boolean; }) => {
    const recordLocalStorage = (recordsLocalStorage ?? []).find((record) => record.account === newRecord.account);
    let recordLocalStorageModified: RecordsLocalStorage | null = null;
    if (!recordLocalStorage) {
      return null;
    }
    const { recordAgeStatusKey, missingStatus } = getRecordAgeStatus(date);
    const { expensesPaid = [] } = newRecord;
    // Add new expense and sort records by date.
    let newRecords: RecordRedux[] = [...recordLocalStorage.records[recordAgeStatusKey], newRecord].sort(sortByDate);

    // If income, update expenses selected
    if (isIncome && expensesPaid && expensesPaid.length > 0) {
      const expensesIds = expensesPaid.map((currentExpense) => currentExpense._id);
      // Since we do not know what record age status that we have, we use the missing status from getRecordAgeStatus and that's what we update
      newRecords = newRecords.map((record) => updateRecordPaymentStatus({ record, expensesIds, paid: true }));
      const updatedRecords = recordLocalStorage.records[missingStatus[0]].map(
        (record) => updateRecordPaymentStatus({ record, expensesIds, paid: true }),
      );
      const moreUpdatedRecords = recordLocalStorage.records[missingStatus[1]].map(
        (record) => updateRecordPaymentStatus({ record, expensesIds, paid: true }),
      );
      recordLocalStorageModified = {
        ...recordLocalStorage,
        records: {
          ...recordLocalStorage.records,
          [recordAgeStatusKey]: newRecords,
          [missingStatus[0]]: updatedRecords,
          [missingStatus[1]]: moreUpdatedRecords,
        },
      };
    }

    const newRecordLocalStorage = getNewRecordsClassifiedByAge({
      newRecords, newRecord, recordLocalStorage: recordLocalStorageModified ?? recordLocalStorage, recordAgeStatusKey,
    });
    return newRecordLocalStorage;
  };

  const updateStoreStorageOnCreateLocalTransfer = ({
    date, expense, income,
  }: { date: Date, expense: RecordRedux, income: RecordRedux }) => {
    const expenseLocalStorage = getRecordsLocalStorageInfo({ newRecord: expense, date });
    if (!expenseLocalStorage) {
      console.log('Error while formatting expense local storage');
      return;
    }

    const incomeLocalStorage = getRecordsLocalStorageInfo({ newRecord: income, date, isIncome: true });
    if (!incomeLocalStorage) {
      console.log('Error while formatting income local storage');
      return;
    }
    const filteredRecords = (recordsLocalStorage ?? [])
      .filter((record) => (record.account !== income.account) && (record.account !== expense.account));
    filteredRecords.push(expenseLocalStorage, incomeLocalStorage);

    dispatch(saveRecordsLocalStorage(filteredRecords));
    dispatch(saveRecordsLocalStorageSelectedAccount(expenseLocalStorage));
    addToLocalStorage({ newInfo: filteredRecords, prop: 'records' });
  };

  const deleteLocalRecord = ({
    recordId, account, date, expensesPaid,
  }
  : { recordId: string, account: string, date: Date, expensesPaid: ExpensePaid[] }) => {
    const recordLocalStorage = (recordsLocalStorage ?? []).find((record) => record.account === account);
    if (!recordLocalStorage) {
      console.error(`Records of local storage not found by the account: ${account}`);
      return null;
    }
    const { recordAgeStatusKey } = getRecordAgeStatus(date);
    const recordsFiltered = recordLocalStorage.records[recordAgeStatusKey].filter((rec) => rec._id !== recordId);
    let newRecordLocalStorage: RecordsLocalStorage = {
      ...recordLocalStorage,
      records: {
        ...recordLocalStorage.records,
        [recordAgeStatusKey]: recordsFiltered,
      },
    };

    if (expensesPaid.length > 0) {
      // Get expenses ids
      // Map records from currentMonth, lastMonth, olderRecords and set isPaid to false
      const expensesIds = expensesPaid.map((expense) => expense._id);
      const currentMonthRecords = newRecordLocalStorage.records.currentMonth.map(
        (record) => updateRecordPaymentStatus({ record, expensesIds, paid: false }),
      );
      const lastMonthRecords = newRecordLocalStorage.records.lastMonth.map(
        (record) => updateRecordPaymentStatus({ record, expensesIds, paid: false }),
      );
      const olderRecords = newRecordLocalStorage.records.olderRecords.map(
        (record) => updateRecordPaymentStatus({ record, expensesIds, paid: false }),
      );
      newRecordLocalStorage = {
        ...newRecordLocalStorage,
        records: {
          currentMonth: currentMonthRecords,
          lastMonth: lastMonthRecords,
          olderRecords,
        },
      };
    }

    const allRecordsLocalStorage = (recordsLocalStorage ?? []).filter((record) => record.account !== account);
    if (!allRecordsLocalStorage) {
      return null;
    }
    allRecordsLocalStorage.push(newRecordLocalStorage);

    return {
      newRecordLocalStorage,
      allRecordsLocalStorage,
    };
  };

  const createExpenseIncomeLocalStorage = (values: CreateExpenseValues | CreateIncomeValues) => {
    // this could be part of a hook formatting the expense
    const { category, date } = values;
    const categoryFound = categoriesLocalStorage.find((cat) => cat.categoryName === category);
    if (!categoryFound) {
      console.error('Category not found while creating expense locally');
      return;
    }
    const newRecord = formatCreateLocalRecord({ values, category: categoryFound });

    // Save in local storage and redux
    const recordLocalStorage = (recordsLocalStorage ?? []).find((record) => record.account === newRecord.account);
    let recordLocalStorageModified: RecordsLocalStorage | null = null;
    if (recordLocalStorage) {
      const { recordAgeStatusKey, missingStatus } = getRecordAgeStatus(date.toDate());
      const { expensesPaid = [] } = newRecord;
      // Add new expense and sort records by date.
      let newRecords: RecordRedux[] = [...recordLocalStorage.records[recordAgeStatusKey], newRecord].sort(sortByDate);

      // If income, update expenses selected
      if (expensesPaid && expensesPaid.length > 0) {
        const expensesIds = expensesPaid.map((expense) => expense._id);
        // Since we do not know what record age status that we have, we use the missing status from getRecordAgeStatus and that's what we update
        newRecords = newRecords.map((record) => updateRecordPaymentStatus({ record, expensesIds, paid: true }));
        const updatedRecords = recordLocalStorage.records[missingStatus[0]].map(
          (record) => updateRecordPaymentStatus({ record, expensesIds, paid: true }),
        );
        const moreUpdatedRecords = recordLocalStorage.records[missingStatus[1]].map(
          (record) => updateRecordPaymentStatus({ record, expensesIds, paid: true }),
        );
        recordLocalStorageModified = {
          ...recordLocalStorage,
          records: {
            ...recordLocalStorage.records,
            [recordAgeStatusKey]: newRecords,
            [missingStatus[0]]: updatedRecords,
            [missingStatus[1]]: moreUpdatedRecords,
          },
        };
      }

      const newRecordLocalStorage = getNewRecordsClassifiedByAge({
        newRecords, newRecord, recordLocalStorage: recordLocalStorageModified ?? recordLocalStorage, recordAgeStatusKey,
      });
      const filteredRecords = (recordsLocalStorage ?? []).filter((record) => record.account !== newRecord.account);
      if (filteredRecords.length === 0) {
        console.error(`local records of the account ${newRecord.account} not found`);
        return;
      }

      filteredRecords.push(newRecordLocalStorage);
      dispatch(saveRecordsLocalStorage(filteredRecords));
      dispatch(saveRecordsLocalStorageSelectedAccount(newRecordLocalStorage));
      addToLocalStorage({ newInfo: filteredRecords, prop: 'records' });

      // Modify amount of the account
      const isExpense = isCreateExpense(values);
      updateAmountAccount({
        amount: newRecord.amount, isExpense, accountId: newRecord.account, isGuestUser: true,
      });

      // Show success notification
      updateGlobalNotification({
        newTitle: 'Record created',
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
    }
  };

  const prepareEditExpenseLocal = ({
    payload, category, transferInfo,
  }: { payload: EditExpenseProps, category: Category, transferInfo?: TransferRecordInfo }) => {
    const { values, recordId } = payload;
    const { date } = values;
    const editedExpense = formatEditLocalRecord(payload, category);

    const response = getLocalRecordsOrderedOnEdit({
      account: values.account, date: date.toDate(), recordId, editedRecord: editedExpense, transferInfo,
    });
    if (!response) {
      console.error(`Records of local storage not found by the account: ${values.account}`);
      return null;
    }
    const { newRecords, recordLocalStorage, recordAgeStatusKey } = response;
    const newRecordLocalStorage = getNewRecordsClassifiedByAge({
      newRecords, newRecord: editedExpense, recordLocalStorage, recordAgeStatusKey,
    });
    return newRecordLocalStorage;
  };

  const prepareEditIncomeLocal = ({
    payload, category, transferInfo,
  }: { payload: EditIncomeProps, category: Category, transferInfo?: TransferRecordInfo }) => {
    const {
      values, recordId, previousExpensesRelated,
    } = payload;
    const { date } = values;

    const editedIncome = formatEditLocalRecord(payload, category);
    const { expensesPaid = [] } = editedIncome;
    const response = getLocalRecordsOrderedOnEdit({
      account: values.account, date: date.toDate(), recordId, editedRecord: editedIncome, transferInfo,
    });
    if (!response) {
      console.error(`Records of local storage not found by the account: ${values.account}`);
      return null;
    }
    const {
      newRecords: newRecordsOrdered, recordLocalStorage, recordAgeStatusKey, missingStatus,
    } = response;
    const newRecords: RecordRedux[] = newRecordsOrdered;

    const newRecordLocalStorage = getNewRecordsClassifiedByAge({
      newRecords, newRecord: editedIncome, recordLocalStorage, recordAgeStatusKey,
    });
    let updatedLocalStorage: RecordsLocalStorage | null = null;

    if (expensesPaid && expensesPaid.length > 0) {
      const expensesIds = expensesPaid.map((expense) => expense._id);
      const oldExpensesIds = previousExpensesRelated.map((expense) => expense._id);
      updatedLocalStorage = {
        ...newRecordLocalStorage,
        records: {
          ...newRecordLocalStorage.records,
          [recordAgeStatusKey]: newRecordLocalStorage.records[recordAgeStatusKey].map(
            (record) => updateEditedRecordStatus({ record, expensesIds, oldExpensesIds }),
          ),
          [missingStatus[0]]: newRecordLocalStorage.records[missingStatus[0]].map(
            (record) => updateEditedRecordStatus({ record, expensesIds, oldExpensesIds }),
          ),
          [missingStatus[1]]: newRecordLocalStorage.records[missingStatus[1]].map(
            (record) => updateEditedRecordStatus({ record, expensesIds, oldExpensesIds }),
          ),
        },
      };
    }

    return updatedLocalStorage ?? newRecordLocalStorage;
  };

  const editExpenseLocalStorage = (payload: EditExpenseProps) => {
    const { values, recordId, previousAmount } = payload;
    const { category, date } = values;
    const categoryFound = categoriesLocalStorage.find((cat) => cat.categoryName === category);
    if (!categoryFound) {
      console.error('Category not found while creating expense locally');
      return;
    }
    const editedExpense = formatEditLocalRecord(payload, categoryFound);

    const response = getLocalRecordsOrderedOnEdit({
      account: values.account, date: date.toDate(), recordId, editedRecord: editedExpense,
    });
    if (!response) {
      console.error(`Records of local storage not found by the account: ${values.account}`);
      return;
    }
    const { newRecords, recordLocalStorage, recordAgeStatusKey } = response;
    const newRecordLocalStorage = getNewRecordsClassifiedByAge({
      newRecords, newRecord: editedExpense, recordLocalStorage, recordAgeStatusKey,
    });

    const updateReduxLocalStorageResponse = updateStoreStorageOnEditLocalRecord({
      account: editedExpense.account, newRecords: newRecordLocalStorage,
    });
    if (!updateReduxLocalStorageResponse) {
      console.error(`local records of the account ${editedExpense.account} not found`);
      return;
    }

    // Modify amount of the account
    const isExpense = isCreateExpense(values);
    updateAmountAccountOnEditRecord({
      amount: editedExpense.amount, isExpense, previousAmount, accountId: editedExpense.account, isGuestUser: true,
    });

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record updated',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const editIncomeLocalStorage = (payload: EditIncomeProps) => {
    const {
      values, recordId, previousAmount, previousExpensesRelated,
    } = payload;
    const { category, date } = values;
    const categoryFound = categoriesLocalStorage.find((cat) => cat.categoryName === category);
    if (!categoryFound) {
      console.error('Category not found while creating expense locally');
      return;
    }
    const editedIncome = formatEditLocalRecord(payload, categoryFound);
    const { expensesPaid = [] } = editedIncome;
    const response = getLocalRecordsOrderedOnEdit({
      account: values.account, date: date.toDate(), recordId, editedRecord: editedIncome,
    });
    if (!response) {
      console.error(`Records of local storage not found by the account: ${values.account}`);
      return;
    }
    const {
      newRecords: newRecordsOrdered, recordLocalStorage, recordAgeStatusKey, missingStatus,
    } = response;
    const newRecords: RecordRedux[] = newRecordsOrdered;

    const newRecordLocalStorage = getNewRecordsClassifiedByAge({
      newRecords, newRecord: editedIncome, recordLocalStorage, recordAgeStatusKey,
    });
    let updatedLocalStorage: RecordsLocalStorage | null = null;

    if (expensesPaid && expensesPaid.length > 0) {
      const expensesIds = expensesPaid.map((expense) => expense._id);
      const oldExpensesIds = previousExpensesRelated.map((expense) => expense._id);
      updatedLocalStorage = {
        ...newRecordLocalStorage,
        records: {
          ...newRecordLocalStorage.records,
          [recordAgeStatusKey]: newRecordLocalStorage.records[recordAgeStatusKey].map(
            (record) => updateEditedRecordStatus({ record, expensesIds, oldExpensesIds }),
          ),
          [missingStatus[0]]: newRecordLocalStorage.records[missingStatus[0]].map(
            (record) => updateEditedRecordStatus({ record, expensesIds, oldExpensesIds }),
          ),
          [missingStatus[1]]: newRecordLocalStorage.records[missingStatus[1]].map(
            (record) => updateEditedRecordStatus({ record, expensesIds, oldExpensesIds }),
          ),
        },
      };
    }

    const updateReduxLocalStorageResponse = updateStoreStorageOnEditLocalRecord({
      account: editedIncome.account, newRecords: updatedLocalStorage ?? newRecordLocalStorage,
    });
    if (!updateReduxLocalStorageResponse) {
      console.error(`local records of the account ${editedIncome.account} not found`);
      return;
    }

    // Modify amount of the account
    const isExpense = isCreateExpense(values);
    updateAmountAccountOnEditRecord({
      amount: editedIncome.amount, isExpense, previousAmount, accountId: editedIncome.account, isGuestUser: true,
    });

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record updated',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const editTransferLocal = ({ payloadExpense, payloadIncome }: { payloadExpense: EditExpenseProps, payloadIncome: EditIncomeProps }) => {
    const { values: { category, account: accountExpense }, recordId: expenseId } = payloadExpense;
    const { values: { account: accountIncome }, recordId: incomeId } = payloadIncome;

    const categoryFound = categoriesLocalStorage.find((cat) => cat.categoryName === category);
    if (!categoryFound) {
      const error = 'Error: Category not found while creating expense locally';
      console.error(error);
      return;
    }

    const expenseRecordLocalStorage = prepareEditExpenseLocal({
      payload: payloadExpense, category: categoryFound, transferInfo: { transferId: incomeId, account: accountIncome },
    });
    console.log('expenseRecordLocalStorage', expenseRecordLocalStorage);
    if (!expenseRecordLocalStorage) return;

    const incomeRecordLocalStorage = prepareEditIncomeLocal({
      payload: payloadIncome, category: categoryFound, transferInfo: { transferId: expenseId, account: accountExpense },
    });
    console.log('incomeRecordLocalStorage', incomeRecordLocalStorage);
    if (!incomeRecordLocalStorage) return;

    const filteredRecords = (recordsLocalStorage ?? [])
      .filter((record) => (record.account !== accountExpense) && (record.account !== accountIncome));
    filteredRecords.push(expenseRecordLocalStorage, incomeRecordLocalStorage);

    dispatch(saveRecordsLocalStorage(filteredRecords));
    dispatch(saveRecordsLocalStorageSelectedAccount(expenseRecordLocalStorage));
    addToLocalStorage({ newInfo: filteredRecords, prop: 'records' });

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Transfer edited',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const createExpense = async (values: CreateExpenseValues) => {
    try {
      const { amount, date: dateValue, account } = values;
      const date = dateValue.toDate();

      await createExpenseMutation({ values, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmountAccountResponse = await updateAmountAccount({ amount, isExpense: true, accountId: account });
      // If there's an error while updating the account, return
      if (updateAmountAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      updateTotalsExpense({ date, amount });

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

  const createTransferLocal = ({ valuesExpense, valuesIncome }: { valuesExpense: CreateExpenseValues; valuesIncome: CreateIncomeValues }) => {
    const { category } = valuesExpense;
    const categoryFound = categoriesLocalStorage.find((cat) => cat.categoryName === category);
    if (!categoryFound) {
      console.error('Category not found while creating expense locally');
      return;
    }
    const { expense, income } = formatCreateTransfer({ income: valuesIncome, expense: valuesExpense, category: categoryFound });

    updateStoreStorageOnCreateLocalTransfer({ expense, income, date: valuesExpense.date.toDate() });

    updateAmountAccount({
      amount: expense.amount, isExpense: true, accountId: expense.account, isGuestUser: true,
    });
    updateAmountAccount({
      amount: income.amount, isExpense: false, accountId: income.account, isGuestUser: true,
    });

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Transfer created',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const createTransfer = async ({ valuesExpense, valuesIncome }: CreateTransferProps) => {
    try {
      const { amount: amountExpense, date: dateExpense, account: accountExpense } = valuesExpense;
      const { amount: amountIncome, account: accountIncome, date: dateIncome } = valuesIncome;

      await createTransferMutation({ values: { expense: valuesExpense, income: valuesIncome }, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmountOriginAccountResponse = await updateAmountAccount({ amount: amountExpense, isExpense: true, accountId: accountExpense });
      // If there's an error while updating the account, return
      if (updateAmountOriginAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      const updateAmountDestinationAccountResponse = await updateAmountAccount({
        amount: amountIncome, isExpense: false, accountId: accountIncome,
      });
      if (updateAmountDestinationAccountResponse !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      updateTotalsExpense({ date: dateExpense.toDate(), amount: amountExpense });
      updateTotalsIncome({ date: dateIncome.toDate(), amount: amountIncome });

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

      await editExpenseMutation({ values: newValues, bearerToken }).unwrap();
      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({
          amount, isExpense: true, previousAmount, accountId,
        });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      updateTotalsExpense({
        date, amount, edit: true, previousAmount,
      });

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

      await createIncomeMutation({ values, bearerToken }).unwrap();

      // Update the amount of the account.
      const updateAmount = await updateAmountAccount({ amount, isExpense: false, accountId: account });
      // If there's an error while updating the account, return
      if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;

      updateTotalsIncome({ date, amount });

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

      await editIncomeMutation({ values: newValues, bearerToken }).unwrap();

      if (amountTouched) {
        const updateAmount = await updateAmountAccountOnEditRecord({
          amount, isExpense: false, previousAmount, accountId,
        });
        // If there's an error while updating the account, return
        if (updateAmount !== UPDATE_AMOUNT_ACCOUNT_SUCCESS_RESPONSE) return;
      }

      updateTotalsIncome({
        date, amount, edit: true, previousAmount,
      });

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

  const deleteRecord = async ({ deleteTransfer, isGuestUser }: { deleteTransfer?: boolean; isGuestUser: boolean; }) => {
    try {
      const amountOfRecord = recordToBeDeleted?.amount as number;
      const recordId = recordToBeDeleted?._id as string;
      const accountRecord = recordToBeDeleted?.account as string;
      const date = recordToBeDeleted?.date as Date;
      const expensesRelated = recordToBeDeleted?.expensesPaid ?? [];
      const valuesDeleteRecord: DeleteRecordProps = { recordId };
      const route = deleteRecordExpense ? EXPENSE_ROUTE : INCOME_ROUTE;

      if (isGuestUser) {
        if (deleteTransfer) {
          const transferRecordId = recordToBeDeleted?.transferRecord?.transferId ?? '';
          const transferAccountId = recordToBeDeleted?.transferRecord?.account ?? '';

          const responseRecord = deleteLocalRecord({
            recordId, account: accountRecord, date, expensesPaid: expensesRelated,
          });
          if (!responseRecord) {
            console.log('Error while obtaining record to be deleted from local storage');
            return;
          }

          const responseTransferRecord = deleteLocalRecord({
            recordId: transferRecordId, account: transferAccountId, date, expensesPaid: expensesRelated,
          });
          if (!responseTransferRecord) {
            console.log('Error while obtaining transfer record from local storage');
            return;
          }
          const { newRecordLocalStorage } = responseRecord;
          const { newRecordLocalStorage: recordTransferLocalStorage } = responseTransferRecord;

          const filteredRecords = (recordsLocalStorage ?? [])
            .filter((record) => (record.account !== accountRecord) && (record.account !== transferAccountId));
          filteredRecords.push(newRecordLocalStorage, recordTransferLocalStorage);

          dispatch(saveRecordsLocalStorage(filteredRecords));
          dispatch(saveRecordsLocalStorageSelectedAccount(newRecordLocalStorage));
          addToLocalStorage({ newInfo: filteredRecords, prop: 'records' });
          return;
        }

        const response = deleteLocalRecord({
          recordId, account: accountRecord, date, expensesPaid: expensesRelated,
        });
        if (!response) {
          return;
        }
        const { newRecordLocalStorage, allRecordsLocalStorage } = response;
        dispatch(saveRecordsLocalStorage(allRecordsLocalStorage));
        dispatch(saveRecordsLocalStorageSelectedAccount(newRecordLocalStorage));
        addToLocalStorage({ newInfo: allRecordsLocalStorage, prop: 'records' });
      } else {
        await deleteRecordMutation({ values: valuesDeleteRecord, route, bearerToken });
      }

      // Update Amount of the account.
      const updateAmount = await updateAmountAccount({
        amount: amountOfRecord, isExpense: deleteRecordExpense ?? false, deleteRecord: true, accountId: accountRecord, isGuestUser,
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
    createExpenseIncomeLocalStorage,
    createTransferLocal,
    editTransferLocal,
    editExpenseLocalStorage,
    editIncomeLocalStorage,
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
