/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecordsByMonthAndYear } from '../../../../utils/getRecordByMonthAndYear';
import { RecordsInitialState } from '../interface';
import { NO_EXPENSES_OR_INCOMES_FOUND } from '../../../../components/UI/Records/constants';
import { ZERO_CURRENCY } from '../../../../constants';
import { formatNumberToCurrency } from '../../../../utils';

export const fetchLastMonthRecords = createAsyncThunk(
  'records/fetchLastMonthRecords',
  getRecordsByMonthAndYear,
);

export const fetchLastMonthRecordsFullfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchLastMonthRecords.fulfilled, (state, action) => {
  state.loadingOnAction = false;

  // No records. No need to update the state.
  if (action.payload?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
    // Update the old state
    state.totalRecords.lastMonth.expenseTotal = ZERO_CURRENCY;
    state.totalRecords.lastMonth.incomeTotal = ZERO_CURRENCY;
    state.allRecords.lastMonth = [];
    return;
  }

  const recordsFetched = action.payload.records;

  // Set total amount of expenses and incomes.
  let expenseTotalCounter = 0;
  let incomeTotalCounter = 0;
  (recordsFetched || []).forEach((record) => {
    if (record.isPaid !== undefined) {
      expenseTotalCounter += record.amount;
      return;
    }
    incomeTotalCounter += record.amount;
  });

  state.totalRecords.lastMonth.expenseTotal = formatNumberToCurrency(expenseTotalCounter);
  state.totalRecords.lastMonth.incomeTotal = formatNumberToCurrency(incomeTotalCounter);

  state.allRecords.lastMonth = recordsFetched;
});

export const fetchLastMonthRecordsPending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchLastMonthRecords.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const fetchLastMonthRecordsRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchLastMonthRecords.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
