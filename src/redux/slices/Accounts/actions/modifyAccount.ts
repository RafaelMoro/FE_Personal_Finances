/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AccountsInitialState, SingleAccountResponse, ModifyAccountThunkProps } from '../interface';
import { HttpRequestWithBearerToken } from '../../../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../../../components/UI/Account/constants';
import { PUT_HTTP_REQUEST } from '../../../../utils/HttpRequestWithBearerToken/constants';
import { formatAccounts } from '../../../../utils';

export const modifyAccountThunkFn = createAsyncThunk(
  'accounts/modifyAccount',
  async ({ values, bearerToken }: ModifyAccountThunkProps) => {
    const responsePutAccountRequest: SingleAccountResponse = await HttpRequestWithBearerToken(
      values,
      POST_PUT_ACCOUNT_ROUTE,
      PUT_HTTP_REQUEST,
      bearerToken,
    );
    return responsePutAccountRequest;
  },
);

export const modifyAccountPending = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(modifyAccountThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const modifyAccountFulfilled = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(modifyAccountThunkFn.fulfilled, (state, action) => {
  if (state.accounts) {
    // Get old selected account and set selected as false
    const oldSelectedAccountIndex = state.accounts.map((account) => account.selected).indexOf(true);
    state.accounts[oldSelectedAccountIndex].selected = false;
  }

  const indexOfAccountToBeModified = (state.accounts || []).map((account) => account._id).indexOf(action.payload.data._id);
  const filteredAccounts = (state.accounts || [])
    .filter((filteredAccount) => filteredAccount._id !== action.payload.data._id);
  const accountModifiedFormatted = formatAccounts({ accounts: [action.payload.data] });
  const [accountModified] = accountModifiedFormatted;
  // Add account modified with format of accountUI on the filteredAccount array.
  filteredAccounts.splice(indexOfAccountToBeModified, 0, accountModified);

  state.accounts = filteredAccounts;
  state.accountSelected = accountModified;
});

export const modifyAccountRejected = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(modifyAccountThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
