import { AxiosRequestHeaders } from 'axios';
import { AccountType } from '../aliasType';
import { AccountBackgroundColorsKeys, AccountTextColorsKeys } from '../styles/interface';

export interface IUser {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
}

export interface IAccount {
  _id: string;
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: AccountBackgroundColorsKeys;
  color: AccountTextColorsKeys;
}
