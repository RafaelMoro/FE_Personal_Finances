import { AxiosRequestHeaders } from 'axios';
import { AccountUI } from '../../../components/UI/Account/interface';

export interface AccountsInitialState {
  accounts: AccountUI[] | null;
  accountSelected: AccountUI | null;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
}

export interface FetchAccountsValues {
  bearerToken: AxiosRequestHeaders;
}
