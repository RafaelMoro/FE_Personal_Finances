/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpRequestWithBearerToken } from '../../../../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../../../../components/UI/Account/constants';
import { PUT_HTTP_REQUEST } from '../../../../utils/HttpRequestWithBearerToken/constants';
import { AccountsInitialState, SingleAccountResponse, UpdateAmountAccountThunkProps } from '../interface';
import { formatAccounts } from '../../../../utils';
import { AccountUI } from '../../../../components/UI/Account/interface';

export const updateAmountAccountThunkFn = createAsyncThunk(
  'accounts/updateAmountAccount',
  async ({ payload, bearerToken }: UpdateAmountAccountThunkProps) => {
    const updateAccountResponse: SingleAccountResponse = await HttpRequestWithBearerToken(
      payload,
      POST_PUT_ACCOUNT_ROUTE,
      PUT_HTTP_REQUEST,
      bearerToken,
    );
    return updateAccountResponse;
  },
);

export const updateAmountAccountFulfilled = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(updateAmountAccountThunkFn.fulfilled, (state, action) => {
  const { data: { account: accountUpdated } } = action.payload;
  const newAccountFormatted: AccountUI[] = formatAccounts({ accounts: [accountUpdated] });
  const [newAccount] = newAccountFormatted;
  const { amount: newAmount, _id: accountId, amountFormatted } = newAccount;

  // Update account selected with the new amount.
  if (state.accountSelected) {
    const newAccountSelected = { ...state.accountSelected, amount: newAmount, amountFormatted };
    state.accountSelected = newAccountSelected;
  }

  // Update the account with the new amount in the accounts state.
  const accountsUpdated = (state.accounts || []).map((account) => {
    if (account._id === accountId) {
      return { ...account, amount: newAmount, amountFormatted };
    }
    return account;
  });
  state.accounts = accountsUpdated;
});

export const updateAmountAccountPending = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(updateAmountAccountThunkFn.pending, (state) => {
  state.loadingOnAction = true;

  // Reset previous error status if it occurred
  state.errorOnAction = false;
  state.errorMessageOnAction = '';
});

export const updateAmountAccountRejected = (
  builder: ActionReducerMapBuilder<AccountsInitialState>,
) => builder.addCase(updateAmountAccountThunkFn.rejected, (state, action) => {
  state.loadingOnAction = false;
  state.errorOnAction = true;
  state.errorMessageOnAction = action.error.message;
});
