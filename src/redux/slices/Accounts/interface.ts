import { AxiosRequestHeaders } from 'axios';
import { AccountUI, CreateAccount } from '../../../components/UI/Account/interface';

export interface AccountsInitialState {
  accounts: AccountUI[] | null;
  accountSelected: AccountUI | null;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
  loadingOnAction: boolean;
  errorOnAction: boolean;
  errorMessageOnAction: string | unknown;
}

export interface FetchAccountsValues {
  bearerToken: AxiosRequestHeaders;
}

export interface DeleteAccountValues {
  accountId: string;
}

export interface DeleteAccountThunkProps {
  values: DeleteAccountValues;
  bearerToken: AxiosRequestHeaders;
}

export interface CreateAccountThunkProps {
  values: CreateAccount;
  bearerToken: AxiosRequestHeaders;
}
