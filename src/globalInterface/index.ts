import { AxiosRequestHeaders } from 'axios';

export interface User {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
}

export const TYPE_OF_ACCOUNTS = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'] as const;
export type AccountType = typeof TYPE_OF_ACCOUNTS[number];

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

export interface Category {
  _id: string;
  __v: number;
  categoryName: string;
  subCategories: string[];
}

export interface AccountRecord {
  _id: string;
  shortName: string;
  description: string;
  amount: number;
  date: Date;
  category: Category;
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
