import { AxiosRequestHeaders } from 'axios';
import { AccountUI, CreateAccount, ModifyAccountValues } from '../../../components/UI/Account/interface';
import { Account, GeneralResponse } from '../../../globalInterface';

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

export interface DeleteAccountMutationProps {
  values: DeleteAccountValues;
  bearerToken: string;
}

export interface CreateAccountMutationProps {
  values: CreateAccount;
  bearerToken: string;
}

export interface ModifyAccountThunkProps {
  values: ModifyAccountValues;
  bearerToken: AxiosRequestHeaders;
}

export interface UpdateAmountPayload {
  accountId: string;
  amount: number;
}

export interface UpdateAmountAccountThunkProps {
  payload: UpdateAmountPayload
  bearerToken: AxiosRequestHeaders;
}

export interface FetchAccountsResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    accounts: Account[]
  };
}

export interface SingleAccountResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    account: Account;
  };
}

export interface DeleteAccountData {
  accountDeleted: Account;
  numberExpensesDeleted: number;
  numberIncomesDeleted: number;
}

export interface DeleteAccountResponse extends Omit<GeneralResponse, 'data'> {
  data: DeleteAccountData;
}
