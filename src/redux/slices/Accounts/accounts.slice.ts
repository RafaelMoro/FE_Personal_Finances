/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AccountsInitialState } from './interface';

const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: null,
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
});

export const {
  updateAccounts, updateSelectedAccount, resetAccounts, resetSelectedAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
