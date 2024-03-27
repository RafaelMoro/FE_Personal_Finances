import { AccountUI, CreateAccount, ModifyAccountValues } from '../../../components/UI/Account/interface';
import { Account, GeneralResponse } from '../../../globalInterface';

type AccountsState = 'isUninitialized' | 'loading' | 'success';

export interface AccountsInitialState {
  accounts: AccountUI[] | null;
  accountSelected: AccountUI | null;
  accountsFetchStatus: AccountsState;
}

interface UpdateAccountsStatusPayload {
  status: AccountsState;
}
export interface UpdateAccountsStatusProps {
  payload: UpdateAccountsStatusPayload;
  type: string;
}

interface UpdateAmountAccountPayload {
  accountId: string;
  amount: number;
}

export interface UpdateAmountAccountProps {
  payload: UpdateAmountAccountPayload;
  type: string;
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

export interface ModifyAccountMutationProps {
  values: ModifyAccountValues;
  bearerToken: string;
}

export interface UpdateAmountPayload {
  accountId: string;
  amount: number;
}

export interface UpdateAmountAccountMutationProps {
  payload: UpdateAmountPayload
  bearerToken: string;
}

export interface FetchAccountsResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    accounts: Account[]
  };
}
