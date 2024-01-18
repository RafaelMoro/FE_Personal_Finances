/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { INCOME_ROUTE } from '../../../../../components/UI/Records/constants';
import { postRequestWithBearer } from '../../../../../utils';
import { CreateEditRecordResponse } from '../../../../../components/UI/Records/interface';
import { CreateExpenseThunkProps, CreateIncomeThunkResponse, RecordsInitialState } from '../../interface';

export const createIncomeThunkFn = createAsyncThunk(
  'records/incomes/createIncome',
  async ({
    values, bearerToken, isLastMonth = false, isCurrentMonth = false,
  }: CreateExpenseThunkProps) => {
    const incomeResponse: CreateEditRecordResponse = await postRequestWithBearer(values, INCOME_ROUTE, bearerToken);

    const response: CreateIncomeThunkResponse = {
      response: incomeResponse,
      isLastMonth,
      isCurrentMonth,
    };
    return response;
  },
);

export const createIncomeFulfilled = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createIncomeThunkFn.fulfilled, (state, action) => {
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

export const createIncomePending = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createIncomeThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const createIncomeRejected = (
  builder: ActionReducerMapBuilder<RecordsInitialState>,
) => builder.addCase(createIncomeThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
