import { AxiosRequestHeaders } from 'axios';
// eslint-disable-next-line import/no-cycle
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

interface IndebtedPeople {
  name: string;
  amount: number;
  amountPaid: number;
  isPaid: boolean;
}

interface CategoryRecord {
  _id: string;
  categoryName: string;
}

export interface AccountRecord {
  _id: string;
  shortName: string;
  description: string;
  amount: number;
  date: Date;
  category: CategoryRecord;
  subCategory: string;
  tag: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  budgets: string[];
}

export interface ExpenseInterface extends AccountRecord {
  isPaid: boolean;
}

export interface Income extends AccountRecord {
  expensesPaid: ExpenseInterface[];
}
