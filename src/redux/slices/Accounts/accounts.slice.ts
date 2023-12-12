/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestHeaders } from 'axios';
import { GetRequest, formatAccounts } from '../../../utils';
import { GET_ACCOUNTS_ROUTE } from '../../../components/UI/Account/features/ViewAccounts/constants';
import { AccountUI } from '../../../components/UI/Account/interface';

interface AccountsInitialState {
  accounts: AccountUI[] | null;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
}

interface FetchAccountsValues {
  bearerToken: AxiosRequestHeaders;
}

const accountsInitialState: AccountsInitialState = {
  accounts: null,
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
    selectNewAccount: (state, action) => {
      state.accounts = action.payload;
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
      state.accounts = formattedAccounts;
    });

    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    });
  },
});

export const { selectNewAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
