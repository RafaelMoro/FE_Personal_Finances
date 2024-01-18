/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEditRecordResponse } from '../../../../../components/UI/Records/interface';
import { postRequestWithBearer } from '../../../../../utils';
import { EXPENSE_ROUTE } from '../../../../../components/UI/Records/constants';
import { RecordsInitialState, CreateExpenseThunkProps, CreateExpenseThunkResponse } from '../../interface';

export const createExpenseThunkFn = createAsyncThunk(
  'records/expenses/createExpense',
  async ({
    values, bearerToken, isLastMonth = false, isCurrentMonth = false,
  }: CreateExpenseThunkProps) => {
    const expenseResponse: CreateEditRecordResponse = await postRequestWithBearer(values, EXPENSE_ROUTE, bearerToken);

    const response: CreateExpenseThunkResponse = {
      response: expenseResponse,
      isLastMonth,
      isCurrentMonth,
    };
    return response;
  },
);

export const createExpenseFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createExpenseThunkFn.fulfilled, (state, action) => {
  const {
    response, isLastMonth, isCurrentMonth,
  } = action.payload;

  if (isCurrentMonth && state.allRecords.currentMonth) {
    const recordsUpdated = [...state.allRecords.currentMonth];
    recordsUpdated.unshift(response.data);
    state.allRecords.currentMonth = recordsUpdated;
    return;
  }

  if (isLastMonth && state.allRecords.lastMonth) {
    const recordsUpdated = [...state.allRecords.lastMonth];
    recordsUpdated.unshift(response.data);
    state.allRecords.lastMonth = recordsUpdated;
    return;
  }

  const recordsUpdated = [...(state.allRecords.olderRecords ?? [])];
  recordsUpdated.unshift(response.data);
  state.allRecords.olderRecords = recordsUpdated;
});

export const createExpensePending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createExpenseThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const createExpenseRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createExpenseThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
