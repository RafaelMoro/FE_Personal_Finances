import { AxiosRequestHeaders } from 'axios';
import { AccountType } from '../aliasType';
import { SystemStateEnum } from '../enums';
import { AccountBackgroundColorsKeys, AccountTextColorsKeys } from '../styles/interface';

export interface IUser {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
}

export interface IAccount {
  _id: string;
  title: string;
  amount: number | string;
  accountType: AccountType;
  backgroundColor: AccountBackgroundColorsKeys;
  color: AccountTextColorsKeys;
}

export interface IGlobalNotification {
  title: string;
  description: string;
  status: SystemStateEnum;
}
