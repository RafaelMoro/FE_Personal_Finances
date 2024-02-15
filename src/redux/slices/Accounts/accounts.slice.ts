/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AccountsInitialState, UpdateAccountsStatusProps } from './interface';

const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: null,
  accountsFetchStatus: 'isUninitialized',
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    updateAccountsStatus: (state, action: UpdateAccountsStatusProps) => {
      if (action.payload.status === 'loading') {
        state.accountsFetchStatus = 'loading';
        return;
      }

      state.accountsFetchStatus = 'success';
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
  updateAccounts, updateSelectedAccount, resetAccounts, resetSelectedAccount, updateAccountsStatus,
} = accountsSlice.actions;

export default accountsSlice.reducer;
