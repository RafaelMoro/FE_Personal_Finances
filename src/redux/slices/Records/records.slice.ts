/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ZERO_CURRENCY } from '../../../constants';
import { RecordsInitialState, UpdateTotalExpenseAndIncomeProps, UpdateTotalExpenseIncomeAction } from './interface';

const recordsInitialState: RecordsInitialState = {
  recordToBeModified: null,
  allRecords: {
    currentMonth: null,
    lastMonth: null,
    olderRecords: null,
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
  reducers: {
    setRecordToBeModified: (state, action) => {
      state.recordToBeModified = action.payload;
    },
    resetRecordsAndTotal: (state) => {
      state.allRecords.currentMonth = [];
      state.allRecords.lastMonth = [];
      state.allRecords.olderRecords = [];

      state.totalRecords.currentMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.currentMonth.incomeTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.incomeTotal = ZERO_CURRENCY;
    },
    resetAllRecords: (state) => {
      state.allRecords.currentMonth = [];
      state.allRecords.lastMonth = [];
      state.allRecords.olderRecords = [];
    },
    updateTotalExpensesIncomes: (state, action: UpdateTotalExpenseAndIncomeProps) => {
      if (action.payload.period === 'CurrentMonth') {
        state.totalRecords.currentMonth.expenseTotal = action.payload.expenseTotalCounter;
        state.totalRecords.currentMonth.incomeTotal = action.payload.incomeTotalCounter;
        return;
      }

      state.totalRecords.lastMonth.expenseTotal = action.payload.expenseTotalCounter;
      state.totalRecords.lastMonth.incomeTotal = action.payload.incomeTotalCounter;
    },
    updateTotalExpense: (state, action: UpdateTotalExpenseIncomeAction) => {
      const { recordAgeCategory, newAmount } = action.payload;
      if (recordAgeCategory === 'Current Month') {
        state.totalRecords.currentMonth.expenseTotal = newAmount;
        return;
      }
      state.totalRecords.lastMonth.expenseTotal = newAmount;
    },
    updateTotalIncome: (state, action: UpdateTotalExpenseIncomeAction) => {
      const { recordAgeCategory, newAmount } = action.payload;
      if (recordAgeCategory === 'Current Month') {
        state.totalRecords.currentMonth.incomeTotal = newAmount;
        return;
      }
      state.totalRecords.lastMonth.incomeTotal = newAmount;
    },
  },
});

export const {
  resetRecordsAndTotal, setRecordToBeModified, updateTotalExpense, updateTotalIncome, resetAllRecords,
  updateTotalExpensesIncomes,
} = recordsSlice.actions;

export default recordsSlice.reducer;
