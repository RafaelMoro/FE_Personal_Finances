// /* eslint-disable no-param-reassign */
// import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
// import { UPDATE_MULTIPLE_EXPENSES } from '../../../../../components/UI/Records/constants';
// import { PUT_HTTP_REQUEST } from '../../../../../utils/HttpRequestWithBearerToken/constants';
// import { RecordsInitialState, UpdateRelatedExpenses, UpdatedRelatedExpensesResponse } from '../../interface';
// import { HttpRequestWithBearerToken } from '../../../../../utils/HttpRequestWithBearerToken';
// import { Expense, UpdateMultipleExpensesError } from '../../../../../globalInterface';

// export const updateRelatedExpenses = createAsyncThunk(
//   'records/expenses/updateRelatedExpenses',
//   async ({
//     payload, bearerToken, isLastMonth, isCurrentMonth,
//   }: UpdateRelatedExpenses, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     const expensesUpdated: Expense[] | UpdateMultipleExpensesError = await HttpRequestWithBearerToken(
//       payload,
//       UPDATE_MULTIPLE_EXPENSES,
//       PUT_HTTP_REQUEST,
//       bearerToken,
//     );

//     if ((expensesUpdated as UpdateMultipleExpensesError).message) return rejectWithValue(expensesUpdated);

//     const response: UpdatedRelatedExpensesResponse = {
//       response: expensesUpdated as Expense[],
//       isLastMonth,
//       isCurrentMonth,
//     };
//     return response;
//   },
// );

// export const updateRelatedExpensesFulfilled = (
//   builder: ActionReducerMapBuilder<RecordsInitialState>,
// ) => builder.addCase(updateRelatedExpenses.fulfilled, (state, action) => {
//   const {
//     response, isLastMonth, isCurrentMonth,
//   } = action.payload;

//   if (isCurrentMonth && state.allRecords.currentMonth) {
//     const updatedRecords = state.allRecords.currentMonth.map((record) => {
//       const recordFound = response.find((newRecord) => newRecord._id === record._id);
//       if (recordFound) return { ...record, isPaid: recordFound.isPaid };
//       return record;
//     });
//     state.allRecords.currentMonth = updatedRecords;
//     return;
//   }

//   if (isLastMonth && state.allRecords.lastMonth) {
//     const updatedRecords = state.allRecords.lastMonth.map((record) => {
//       const recordFound = response.find((newRecord) => newRecord._id === record._id);
//       if (recordFound) return { ...record, isPaid: recordFound.isPaid };
//       return record;
//     });
//     state.allRecords.lastMonth = updatedRecords;
//     return;
//   }

//   const updatedRecords = (state.allRecords.olderRecords ?? []).map((record) => {
//     const recordFound = response.find((newRecord) => newRecord._id === record._id);
//     if (recordFound) return { ...record, isPaid: recordFound.isPaid };
//     return record;
//   });
//   state.allRecords.olderRecords = updatedRecords;
// });

// export const updateRelatedExpensesPending = (
//   builder: ActionReducerMapBuilder<RecordsInitialState>,
// ) => builder.addCase(updateRelatedExpenses.pending, (state) => {
//   state.loadingOnAction = true;

//   // Reset previous error status if it occurred
//   state.errorOnAction = false;
//   state.errorMessageOnAction = '';
// });

// export const updateRelatedExpensesRejected = (
//   builder: ActionReducerMapBuilder<RecordsInitialState>,
// ) => builder.addCase(updateRelatedExpenses.rejected, (state, action) => {
//   state.loadingOnAction = false;
//   state.errorOnAction = true;
//   state.errorMessageOnAction = action.error.message;
// });
