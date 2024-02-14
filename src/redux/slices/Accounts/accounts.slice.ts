/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AccountsInitialState } from './interface';
import {
  createAccountFulfilled, createAccountPending, createAccountRejected,
  deleteAccountFullfilled, deleteAccountPending, deleteAccountRejected,
  modifyAccountFulfilled, modifyAccountPending, modifyAccountRejected,
} from './actions';
import { updateAmountAccountFulfilled, updateAmountAccountPending, updateAmountAccountRejected } from './actions/updateAmountAccount';

const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: null,
  loading: false,
  error: false,
  errorMessage: '',
  // These loading and error states are launched on create, delete or update account.
  loadingOnAction: false,
  errorOnAction: false,
  errorMessageOnAction: '',
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    updateSelectedAccount: (state, action) => {
      state.accountSelected = action.payload;
    },
    resetAccounts: (state) => {
      state.accounts = null;
    },
    resetSelectedAccount: (state) => {
      state.accountSelected = null;
    },
  },
  extraReducers: (builder) => {
    deleteAccountPending(builder);
    deleteAccountFullfilled(builder);
    deleteAccountRejected(builder);

    createAccountPending(builder);
    createAccountFulfilled(builder);
    createAccountRejected(builder);

    modifyAccountPending(builder);
    modifyAccountFulfilled(builder);
    modifyAccountRejected(builder);

    updateAmountAccountFulfilled(builder);
    updateAmountAccountPending(builder);
    updateAmountAccountRejected(builder);
  },
});

export const {
  updateAccounts, updateSelectedAccount, resetAccounts, resetSelectedAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
