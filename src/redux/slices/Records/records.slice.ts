/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ZERO_CURRENCY } from '../../../constants';
import { RecordsInitialState, UpdateTotalExpenseAndIncomeProps, UpdateTotalExpenseIncomeAction } from './interface';

const recordsInitialState: RecordsInitialState = {
  recordToBeModified: null,
  recordsLocalStorageSelectedAccount: null,
  recordsLocalStorage: null,
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
    saveRecordsLocalStorageSelectedAccount: (state, action) => {
      state.recordsLocalStorageSelectedAccount = action.payload;
    },
    saveRecordsLocalStorage: (state, action) => {
      state.recordsLocalStorage = action.payload;
    },
    resetTotalBalanceRecords: (state) => {
      state.totalRecords.currentMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.currentMonth.incomeTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.incomeTotal = ZERO_CURRENCY;
    },
    resetLastMonthBalance: (state) => {
      state.totalRecords.lastMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.incomeTotal = ZERO_CURRENCY;
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
  resetTotalBalanceRecords, resetLastMonthBalance, setRecordToBeModified,
  updateTotalExpense, updateTotalIncome, updateTotalExpensesIncomes, saveRecordsLocalStorageSelectedAccount, saveRecordsLocalStorage,
} = recordsSlice.actions;

export default recordsSlice.reducer;
