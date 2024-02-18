/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AccountsInitialState, UpdateAccountsStatusProps } from './interface';
import { formatNumberToCurrency } from '../../../utils';

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
    updateAmountSelectedAccount: (state, action) => {
      const amountNumber = action.payload;
      const amountFormatted = formatNumberToCurrency(amountNumber);

      // Update the amount of the selected account
      if (state.accountSelected) {
        state.accountSelected.amount = amountNumber;
        state.accountSelected.amountFormatted = amountFormatted;
      }

      // Update the account in the accounts state
      if (state.accounts && state.accountSelected) {
        const accountsUpdated = state.accounts.map((account) => {
          if (account._id === state.accountSelected?._id) {
            return { ...account, amount: amountNumber, amountFormatted };
          }
          return account;
        });
        state.accounts = accountsUpdated;
      }
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
  updateAccounts, updateSelectedAccount, resetAccounts,
  resetSelectedAccount, updateAccountsStatus, updateAmountSelectedAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
