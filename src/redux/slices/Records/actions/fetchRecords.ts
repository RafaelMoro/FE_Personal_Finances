/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchRecordsValues, RecordsInitialState } from '../interface';
import { GetRequest, formatNumberToCurrency } from '../../../../utils';
import { IncomeAndExpensesResponse } from '../../../../components/UI/Records/interface';
import { NO_EXPENSES_OR_INCOMES_FOUND } from '../../../../components/UI/Records/constants';
import { ZERO_CURRENCY } from '../../../../constants';

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async ({ expensesFullRoute, bearerToken }: FetchRecordsValues) => {
    const response: IncomeAndExpensesResponse = await GetRequest(expensesFullRoute, bearerToken);
    return response;
  },
);

export const fetchRecordsFullfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchRecords.fulfilled, (state, action) => {
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

export const fetchRecordsPending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchRecords.pending, (state) => {
  state.loading = true;

  // Reset previous error status if it occurred
  state.error = false;
  state.errorMessage = '';
});

export const fetchRecordsRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(fetchRecords.rejected, (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage = action.error.message;
});
