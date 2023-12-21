/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteRecordResponse } from '../../../../components/UI/Records/interface';
import { HttpRequestWithBearerToken } from '../../../../utils/HttpRequestWithBearerToken';
import { DELETE_HTTP_REQUEST } from '../../../../utils/HttpRequestWithBearerToken/constants';
import { DeleteExpenseThunkResponse, DeleteRecordThunkProps, RecordsInitialState } from '../interface';

export const deleteRecordsThunkFn = createAsyncThunk(
  'records/deleteRecord',
  async ({
    values, route, bearerToken, isLastMonth, isCurrentMonth,
  }: DeleteRecordThunkProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const responseDeleteRecord: DeleteRecordResponse = await HttpRequestWithBearerToken(
      values,
      route,
      DELETE_HTTP_REQUEST,
      bearerToken,
    );

    if (responseDeleteRecord?.message) return rejectWithValue(responseDeleteRecord);
    const response: DeleteExpenseThunkResponse = {
      response: responseDeleteRecord,
      values,
      isLastMonth,
      isCurrentMonth,
    };
    return response;
  },
);

export const deletRecordFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(deleteRecordsThunkFn.fulfilled, (state, action) => {
  const {
    values, isLastMonth, isCurrentMonth,
  } = action.payload;
  state.loadingOnAction = false;

  if (isCurrentMonth && state.allRecords.currentMonth) {
    const updatedRecords = state.allRecords.currentMonth.filter((record) => record._id !== values.recordId);
    state.allRecords.currentMonth = updatedRecords;
    return;
  }

  if (isLastMonth && state.allRecords.lastMonth) {
    const updatedRecords = state.allRecords.lastMonth.filter((record) => record._id !== values.recordId);
    state.allRecords.lastMonth = updatedRecords;
    return;
  }

  const updatedRecords = (state.allRecords.olderRecords ?? []).filter((record) => record._id !== values.recordId);
  state.allRecords.olderRecords = updatedRecords;
});

export const deleteRecordPending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(deleteRecordsThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const deleteRecordRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(deleteRecordsThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
