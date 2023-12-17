/* eslint-disable no-param-reassign */
import { AxiosRequestHeaders } from 'axios';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { UPDATE_MULTIPLE_EXPENSES } from '../../../../../components/UI/Records/constants';
import { PUT_HTTP_REQUEST } from '../../../../../utils/HttpRequestWithBearerToken/constants';
import { RecordsInitialState, UpdateRelatedExpensesValues } from '../../interface';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';

interface UpdateRelatedExpenses {
  payload: UpdateRelatedExpensesValues[];
  bearerToken: AxiosRequestHeaders;
}

export const updateRelatedExpenses = createAsyncThunk(
  'records/expenses/updateRelatedExpenses',
  async ({ payload, bearerToken }: UpdateRelatedExpenses, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const expensesUpdated = await HttpRequestWithBearerToken(
      payload,
      UPDATE_MULTIPLE_EXPENSES,
      PUT_HTTP_REQUEST,
      bearerToken,
    );

    if (expensesUpdated?.message) return rejectWithValue(expensesUpdated);

    return expensesUpdated;
  },
);

export const updateRelatedExpensesFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(updateRelatedExpenses.fulfilled, (state, action) => {
  console.log('action', action);
});

export const updateRelatedExpensesPending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(updateRelatedExpenses.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const updateRelatedExpensesRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(updateRelatedExpenses.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
