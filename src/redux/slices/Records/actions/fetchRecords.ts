/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { RecordsInitialState } from '../interface';
import { formatNumberToCurrency } from '../../../../utils';
import { NO_EXPENSES_OR_INCOMES_FOUND } from '../../../../components/UI/Records/constants';
import { ZERO_CURRENCY } from '../../../../constants';
import { getRecordsByMonthAndYear } from '../../../../utils/getRecordByMonthAndYear';

export const fetchCurrentMonthRecords = createAsyncThunk(
  'records/fetchCurrentMonthRecords',
  getRecordsByMonthAndYear,
);

export const fetchCurrentMonthRecordsFullfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchCurrentMonthRecords.fulfilled, (state, action) => {
  state.loading = false;

  // No records. No need to update the state.
  if (action.payload?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
    // Update the old state
    state.totalRecords.currentMonth.expenseTotal = ZERO_CURRENCY;
    state.totalRecords.currentMonth.incomeTotal = ZERO_CURRENCY;
    state.allRecords.currentMonth = [];
    return;
  }

  const recordsFetched = action.payload.records;

  // Set total amount of expenses and incomes.
  let expenseTotalCounter = 0;
  let incomeTotalCounter = 0;
  recordsFetched.forEach((record) => {
    if (record?.isPaid) {
      expenseTotalCounter += record.amount;
      return;
    }
    incomeTotalCounter += record.amount;
  });

  state.totalRecords.currentMonth.expenseTotal = formatNumberToCurrency(expenseTotalCounter);
  state.totalRecords.currentMonth.incomeTotal = formatNumberToCurrency(incomeTotalCounter);

  state.allRecords.currentMonth = recordsFetched;
});

export const fetchCurrentMonthRecordsPending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchCurrentMonthRecords.pending, (state) => {
  state.loading = true;

  // Reset previous error status if it occurred
  state.error = false;
  state.errorMessage = '';
});

export const fetchCurrentMonthRecordsRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchCurrentMonthRecords.rejected, (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage = action.error.message;
});
