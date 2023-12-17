import { createSlice } from '@reduxjs/toolkit';
import { ZERO_CURRENCY } from '../../../constants';
import { RecordsInitialState } from './interface';
import {
  fetchCurrentMonthRecordsFullfilled, fetchCurrentMonthRecordsPending, fetchCurrentMonthRecordsRejected,
} from './actions/fetchCurrentMonthRecords';
import { fetchLastMonthRecordsFullfilled, fetchLastMonthRecordsPending, fetchLastMonthRecordsRejected } from './actions/fetchLastMonthRecords';
import { createExpenseFulfilled, createExpensePending, createExpenseRejected } from './actions/Expenses/createExpense';
import { createIncomeFulfilled, createIncomePending, createIncomeRejected } from './actions/Incomes/createIncome';
import { editExpenseFulfilled, editExpensePending, editExpenseRejected } from './actions/Expenses/editExpense';

const recordsInitialState: RecordsInitialState = {
  loading: false,
  error: false,
  errorMessage: '',
  loadingOnAction: false,
  errorOnAction: false,
  errorMessageOnAction: '',
  allRecords: {
    currentMonth: [],
    lastMonth: [],
    olderRecords: [],
  },
  totalRecords: {
    currentMonth: {
      expenseTotal: ZERO_CURRENCY,
      incomeTotal: ZERO_CURRENCY,
    },
    lastMonth: {
      expenseTotal: ZERO_CURRENCY,
      incomeTotal: ZERO_CURRENCY,
    },
  },
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState: recordsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchCurrentMonthRecordsPending(builder);
    fetchCurrentMonthRecordsRejected(builder);
    fetchCurrentMonthRecordsFullfilled(builder);

    fetchLastMonthRecordsFullfilled(builder);
    fetchLastMonthRecordsPending(builder);
    fetchLastMonthRecordsRejected(builder);

    createExpenseFulfilled(builder);
    createExpensePending(builder);
    createExpenseRejected(builder);

    createIncomeFulfilled(builder);
    createIncomePending(builder);
    createIncomeRejected(builder);

    editExpenseFulfilled(builder);
    editExpensePending(builder);
    editExpenseRejected(builder);
  },
});

export default recordsSlice.reducer;
