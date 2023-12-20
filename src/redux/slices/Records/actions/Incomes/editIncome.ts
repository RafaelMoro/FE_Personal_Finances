/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { EditIncomeThunkProps, EditIncomeThunkResponse, RecordsInitialState } from '../../interface';
import { CreateEditExpenseResponse } from '../../../../../components/UI/Records/interface';
import { INCOME_ROUTE } from '../../../../../components/UI/Records/constants';
import { PUT_HTTP_REQUEST } from '../../../../../utils/HttpRequestWithBearerToken/constants';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';

export const editIncomeThunkFn = createAsyncThunk(
  'records/incomes/editIncome',
  async ({
    values, bearerToken, isLastMonth = false, isCurrentMonth = false,
  }: EditIncomeThunkProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const expenseResponse: CreateEditExpenseResponse = await HttpRequestWithBearerToken(
      values,
      INCOME_ROUTE,
      PUT_HTTP_REQUEST,
      bearerToken,
    );

    // If the response has a message, it's because it's an error. Then, reject.
    if (expenseResponse?.message) return rejectWithValue(expenseResponse);

    const response: EditIncomeThunkResponse = {
      response: expenseResponse,
      isLastMonth,
      isCurrentMonth,
    };
    return response;
  },
);

export const editIncomeFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editIncomeThunkFn.fulfilled, (state, action) => {
  const {
    response: { _id: recordId }, isLastMonth, isCurrentMonth,
  } = action.payload;
  const accountModified = action.payload.response;

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

export const editIncomePending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editIncomeThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const editIncomeRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editIncomeThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
