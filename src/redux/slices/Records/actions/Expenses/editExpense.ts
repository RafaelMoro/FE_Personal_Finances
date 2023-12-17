/* eslint-disable no-param-reassign */
import { AxiosRequestHeaders } from 'axios';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEditExpenseResponse, CreateExpenseValues } from '../../../../../components/UI/Records/interface';
import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
import { EXPENSE_ROUTE } from '../../../../../components/UI/Records/constants';
import { PUT_HTTP_REQUEST } from '../../../../../utils/HttpRequestWithBearerToken/constants';
import { RecordsInitialState } from '../../interface';

interface EditExpenseValues extends CreateExpenseValues {
  recordId: string;
  userId: string;
}

interface EditExpenseThunkProps {
  values: EditExpenseValues;
  bearerToken: AxiosRequestHeaders;
}

export const editExpenseThunkFn = createAsyncThunk(
  'records/expenses/editExpense',
  async ({ values, bearerToken }: EditExpenseThunkProps) => {
    const expenseResponse: CreateEditExpenseResponse = await HttpRequestWithBearerToken(
      values,
      EXPENSE_ROUTE,
      PUT_HTTP_REQUEST,
      bearerToken,
    );
    return expenseResponse;
  },
);

export const editExpenseFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(editExpenseThunkFn.fulfilled, (state, action) => {
  // todo
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
