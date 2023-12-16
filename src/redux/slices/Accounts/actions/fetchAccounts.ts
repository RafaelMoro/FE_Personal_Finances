/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AccountsInitialState, FetchAccountsValues } from '../interface';
import { GetRequest, formatAccounts } from '../../../../utils';
import { GET_ACCOUNTS_ROUTE } from '../../../../components/UI/Account/features/ViewAccounts/constants';

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async ({ bearerToken }: FetchAccountsValues) => {
    const response = await GetRequest(GET_ACCOUNTS_ROUTE, bearerToken);
    return response;
  },
);

export const fetchAccountsFullfilled = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(fetchAccounts.fulfilled, (state, action) => {
  state.loading = false;
  const formattedAccounts = formatAccounts({ accounts: action.payload?.data });
  const [firstAccount] = formattedAccounts;
  state.accountSelected = firstAccount;
  state.accounts = formattedAccounts;
});

export const fetchAccountsPending = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(fetchAccounts.pending, (state) => {
  state.loading = true;

  // Reset previous error status if it occurred
  state.error = false;
  state.errorMessage = '';
});

export const fetchAccountsRejected = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(fetchAccounts.rejected, (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage = action.error.message;
});
