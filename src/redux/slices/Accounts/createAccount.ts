/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AccountsInitialState, CreateAccountThunkProps } from './interface';
import { HttpRequestWithBearerToken } from '../../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../../components/UI/Account/constants';
import { POST_HTTP_REQUEST } from '../../../utils/HttpRequestWithBearerToken/constants';
import { AccountUI } from '../../../components/UI/Account/interface';
import { formatAccounts } from '../../../utils';

export const createAccountThunkFn = createAsyncThunk(
  'accounts/createAccount',
  async ({ values, bearerToken }: CreateAccountThunkProps) => {
    const responseCreateAccountRequest = await HttpRequestWithBearerToken(
      values,
      POST_PUT_ACCOUNT_ROUTE,
      POST_HTTP_REQUEST,
      bearerToken,
    );
    return responseCreateAccountRequest;
  },
);

export const createAccountPending = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(createAccountThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const createAccountFulfilled = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(createAccountThunkFn.fulfilled, (state, action) => {
  const newAccountFormatted: AccountUI[] = formatAccounts({ accounts: [action.payload] });
  const [newAccount] = newAccountFormatted;
  state.accounts?.push(newAccount);

  if (state.accounts) {
    // Get old selected account and set selected as false
    const oldSelectedAccountIndex = state.accounts.map((account) => account.selected).indexOf(true);
    state.accounts[oldSelectedAccountIndex].selected = false;
  }
  // Assign new account as selected
  state.accountSelected = newAccount;
});

export const createAccountRejected = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(createAccountThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
