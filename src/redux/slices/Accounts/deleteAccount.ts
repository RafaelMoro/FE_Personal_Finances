/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AccountsInitialState, DeleteAccountProps } from './interface';
import { HttpRequestWithBearerToken } from '../../../utils/HttpRequestWithBearerToken';
import { DELETE_ACCOUNT_ROUTE } from '../../../components/UI/Account/constants';
import { DELETE_HTTP_REQUEST } from '../../../utils/HttpRequestWithBearerToken/constants';

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async ({ values, bearerToken }: DeleteAccountProps) => {
    const responseDeleteAccountRequest = await HttpRequestWithBearerToken(
      values,
      DELETE_ACCOUNT_ROUTE,
      DELETE_HTTP_REQUEST,
      bearerToken,
    );
    return responseDeleteAccountRequest;
  },
);

export const deleteAccountPending = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(deleteAccount.pending, (state) => {
  state.loading = true;

  // Reset previous error status if it occurred
  state.error = false;
  state.errorMessage = '';
});

export const deleteAccountFullfilled = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(deleteAccount.fulfilled, (state, action) => {
  state.loading = false;

  const accountsFiltered = (state.accounts || []).filter((account) => account._id !== action.payload?._id);
  const [firstAccount] = accountsFiltered;
  if (accountsFiltered.length > 0) firstAccount.selected = true;
  state.accountSelected = firstAccount;
  state.accounts = accountsFiltered;
});

export const deleteAccountRejected = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(deleteAccount.rejected, (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage = action.error.message;
});
