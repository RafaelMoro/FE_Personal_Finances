import { AxiosRequestHeaders } from 'axios';
import { AccountType } from '../aliasType';

export interface User {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
}

export interface Account {
  _id: string;
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: string;
  color: string;
}
