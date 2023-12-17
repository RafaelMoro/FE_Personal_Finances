/* eslint-disable no-param-reassign */
import { AxiosRequestHeaders } from 'axios';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateEditExpenseResponse, CreateExpenseValues } from '../../../../../components/UI/Records/interface';
import { postRequestWithBearer } from '../../../../../utils';
import { EXPENSE_ROUTE } from '../../../../../components/UI/Records/constants';
import { RecordsInitialState } from '../../interface';

interface CreateExpenseThunkProps {
  values: CreateExpenseValues;
  bearerToken: AxiosRequestHeaders;

}

export const createExpense = createAsyncThunk(
  'records/expenses/createExpense',
  async ({ values, bearerToken }: CreateExpenseThunkProps) => {
    const expenseResponse: CreateEditExpenseResponse = await postRequestWithBearer(values, EXPENSE_ROUTE, bearerToken);
    return expenseResponse;
  },
);

export const createExpenseFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createExpense.fulfilled, (state, action) => {
  // ToDo
});

export const createExpensePending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createExpense.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const createExpenseRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createExpense.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
