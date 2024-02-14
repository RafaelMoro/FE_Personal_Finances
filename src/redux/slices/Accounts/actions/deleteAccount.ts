// /* eslint-disable no-param-reassign */
// import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
// import { AccountsInitialState, DeleteAccountResponse, DeleteAccountMutationProps } from '../interface';
// import { HttpRequestWithBearerToken } from '../../../../utils/HttpRequestWithBearerToken';
// import { DELETE_ACCOUNT_ROUTE } from '../../../../components/UI/Account/constants';
// import { DELETE_HTTP_REQUEST } from '../../../../utils/HttpRequestWithBearerToken/constants';

// export const deleteAccount = createAsyncThunk(
//   'accounts/deleteAccount',
//   async ({ values, bearerToken }: DeleteAccountMutationProps) => {
//     const responseDeleteAccountRequest: DeleteAccountResponse = await HttpRequestWithBearerToken(
//       values,
//       DELETE_ACCOUNT_ROUTE,
//       DELETE_HTTP_REQUEST,
//       bearerToken,
//     );
//     return responseDeleteAccountRequest;
//   },
// );

// export const deleteAccountPending = (
//   builder: ActionReducerMapBuilder<AccountsInitialState>,
// ) => builder.addCase(deleteAccount.pending, (state) => {
//   state.loadingOnAction = true;

//   // Reset previous error status if it occurred
//   state.errorOnAction = false;
//   state.errorMessageOnAction = '';
// });

// export const deleteAccountFullfilled = (
//   builder: ActionReducerMapBuilder<AccountsInitialState>,
// ) => builder.addCase(deleteAccount.fulfilled, (state, action) => {
//   state.loadingOnAction = false;

//   const accountsFiltered = (state.accounts || []).filter((account) => account._id !== action.payload.data.accountDeleted._id);
//   const [firstAccount] = accountsFiltered;
//   if (accountsFiltered.length > 0) firstAccount.selected = true;
//   state.accountSelected = firstAccount;
//   state.accounts = accountsFiltered;
// });

// export const deleteAccountRejected = (
//   builder: ActionReducerMapBuilder<AccountsInitialState>,
// ) => builder.addCase(deleteAccount.rejected, (state, action) => {
//   state.loadingOnAction = false;
//   state.errorOnAction = true;
//   state.errorMessageOnAction = action.error.message;
// });
