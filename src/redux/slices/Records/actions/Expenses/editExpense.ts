/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEditExpenseResponse } from '../../../../../components/UI/Records/interface';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
import { EXPENSE_ROUTE } from '../../../../../components/UI/Records/constants';
import { PUT_HTTP_REQUEST } from '../../../../../utils/HttpRequestWithBearerToken/constants';
import { RecordsInitialState, EditExpenseThunkProps, EditExpenseThunkResponse } from '../../interface';

export const editExpenseThunkFn = createAsyncThunk(
  'records/expenses/editExpense',
  async ({
    values, bearerToken, isLastMonth = false, isCurrentMonth = false,
  }: EditExpenseThunkProps) => {
    const expenseResponse: CreateEditExpenseResponse = await HttpRequestWithBearerToken(
      values,
      EXPENSE_ROUTE,
      PUT_HTTP_REQUEST,
      bearerToken,
    );

    const response: EditExpenseThunkResponse = {
      response: expenseResponse,
      isLastMonth,
      isCurrentMonth,
    };
    return response;
  },
);

export const editExpenseFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editExpenseThunkFn.fulfilled, (state, action) => {
  const {
    response: { data: { _id: recordId } }, isLastMonth, isCurrentMonth,
  } = action.payload;
  const accountModified = action.payload.response.data;

  if (isCurrentMonth && state.allRecords.currentMonth) {
    // Get the index of the record that has been modified.
    const oldRecordIndex = state.allRecords.currentMonth.map((record) => record._id).indexOf(recordId);
    // Remove the old one and replace it with the modified record.
    state.allRecords.currentMonth.splice(oldRecordIndex, 1, accountModified);
    return;
  }

  if (isLastMonth && state.allRecords.lastMonth) {
    const oldRecordIndex = state.allRecords.lastMonth.map((record) => record._id).indexOf(recordId);
    state.allRecords.lastMonth.splice(oldRecordIndex, 1, accountModified);
    return;
  }

  const oldRecordIndex = (state.allRecords.olderRecords ?? []).map((record) => record._id).indexOf(recordId);
  (state.allRecords.olderRecords ?? []).splice(oldRecordIndex, 1, accountModified);
});

export const editExpensePending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editExpenseThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const editExpenseRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editExpenseThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
