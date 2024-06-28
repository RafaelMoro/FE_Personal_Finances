/* eslint-disable no-param-reassign */
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AccountsInitialState, UpdateAccountsStatusProps, UpdateAmountAccountProps } from './interface';
import { addToLocalStorage, formatValueToCurrency } from '../../../utils';
import { accountsApiSlice } from './actions';

const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: null,
  accountsLocalStorage: null,
  // This flag will let know records if they can fetch and give feedback to the user
  accountsFetchStatus: 'isUninitialized',
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {
    resetAccountsLocalStorage: (state) => {
      state.accountsLocalStorage = null;
    },
    updateAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    updateAccountsLocalStorage: (state, action) => {
      state.accountsLocalStorage = action.payload;
    },
    updateAccountsStatus: (state, action: UpdateAccountsStatusProps) => {
      if (action.payload.status === 'loading') {
        state.accountsFetchStatus = 'loading';
        return;
      }

      state.accountsFetchStatus = 'success';
    },
    updateAmountSelectedAccount: (state, action: UpdateAmountAccountProps) => {
      const { accountId, amount: amountNumber } = action.payload;
      const amountFormatted = formatValueToCurrency({ amount: amountNumber });

      // Update the amount of the selected account
      if (state.accountSelected && state.accountSelected._id === accountId) {
        state.accountSelected.amount = amountNumber;
        state.accountSelected.amountFormatted = amountFormatted;
      }

      // Update the account in the accounts state
      if (state.accounts && state.accountSelected) {
        const accountsUpdated = state.accounts.map((account) => {
          if (account._id === accountId) {
            return { ...account, amount: amountNumber, amountFormatted };
          }
          return account;
        });
        state.accounts = accountsUpdated;
      }
    },
    updateAmountSelectedAccountLocalStorage: (state, action: UpdateAmountAccountProps) => {
      const { accountId, amount: amountNumber } = action.payload;
      const amountFormatted = formatValueToCurrency({ amount: amountNumber });

      // Update the amount of the selected account
      if (state.accountSelected && state.accountSelected._id === accountId) {
        state.accountSelected.amount = amountNumber;
        state.accountSelected.amountFormatted = amountFormatted;
      }

      // Update the account in the accounts state
      if (state.accountsLocalStorage && state.accountSelected && state.accounts) {
        const accountsUpdated = state.accountsLocalStorage.map((account) => {
          if (account._id === accountId) {
            return { ...account, amount: amountNumber };
          }
          return account;
        });
        const accountsUIUpdated = state.accounts.map((account) => {
          if (account._id === accountId) {
            return { ...account, amount: amountNumber, amountFormatted };
          }
          return account;
        });
        state.accountsLocalStorage = accountsUpdated;
        state.accounts = accountsUIUpdated;
        addToLocalStorage({ newInfo: accountsUpdated, prop: 'accounts' });
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
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(accountsApiSlice.endpoints.fetchAccounts.matchPending), (state) => {
      state.accountsFetchStatus = 'loading';
    });

    builder.addMatcher(isAnyOf(accountsApiSlice.endpoints.fetchAccounts.matchFulfilled), (state, action) => {
      state.accounts = action.payload;
      const [firstAccount] = action.payload;
      state.accountSelected = firstAccount;

      // Update account status
      state.accountsFetchStatus = 'success';
    });
  },
});

export const {
  updateAccounts, updateSelectedAccount, resetAccounts, updateAccountsLocalStorage,
  resetSelectedAccount, updateAccountsStatus, updateAmountSelectedAccount,
  updateAmountSelectedAccountLocalStorage, resetAccountsLocalStorage,
} = accountsSlice.actions;

export default accountsSlice.reducer;
