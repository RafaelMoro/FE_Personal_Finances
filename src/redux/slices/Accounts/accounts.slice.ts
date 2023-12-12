/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetRequest, formatAccounts } from '../../../utils';
import { GET_ACCOUNTS_ROUTE } from '../../../components/UI/Account/features/ViewAccounts/constants';
import { AccountsInitialState, FetchAccountsValues } from './interface';

const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: null,
  loading: false,
  error: false,
  errorMessage: '',
};

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async ({ bearerToken }: FetchAccountsValues) => {
    const response = await GetRequest(GET_ACCOUNTS_ROUTE, bearerToken);
    return response;
  },
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {
    updateAccountsWithNewSelectedAccount: (state, action) => {
      state.accounts = action.payload;
    },
    updateSelectedAccount: (state, action) => {
      state.accountSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state) => {
      state.loading = true;

      // Reset previous error status if it occurred
      state.error = false;
      state.errorMessage = '';
    });

    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.loading = false;
      const formattedAccounts = formatAccounts({ accounts: action.payload?.data });
      const [firstAccount] = formattedAccounts;
      state.accountSelected = firstAccount;
      state.accounts = formattedAccounts;
    });

    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    });
  },
});

export const { updateAccountsWithNewSelectedAccount, updateSelectedAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
