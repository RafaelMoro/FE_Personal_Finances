import { AxiosRequestHeaders } from 'axios';
import { SystemStateEnum } from '../enums';

export interface User {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
}

export const TYPE_OF_ACCOUNTS = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'] as const;
export type AccountType = typeof TYPE_OF_ACCOUNTS[number];

export const ABBREVIATED_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] as const;
export type MonthsType = typeof ABBREVIATED_MONTHS[number];

export interface Account {
  _id: string;
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: string;
  color: string;
}

export interface IndebtedPeople {
  name: string;
  amount: number;
  amountPaid: number;
  isPaid: boolean;
}

export interface IndebtedPeopleTable extends Omit<IndebtedPeople, 'amount' | 'amountPaid'> {
  amount: string;
  amountPaid: string;
  restingDebt: string;
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
  amount: string;
  date: Date;
  fullDate: string;
  formattedTime: string;
  category: Category;
  subCategory: string;
  tag: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  budgets: string[];
}

export interface Expense extends AccountRecord {
  isPaid: boolean;
}

export interface Income extends AccountRecord {
  expensesPaid: Expense[];
}

export interface ExpensePaid {
  _id: string;
  shortName: string;
  amount: string;
  fullDate: string;
  formattedTime: string;
  date?: Date;
}

export interface AnyRecord extends AccountRecord {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

export interface AllRecords {
  currentMonth: AnyRecord [];
  lastMonth: AnyRecord [];
  olderRecords: AnyRecord[];
}

export interface GlobalNotification {
  title: string;
  description: string;
  status: SystemStateEnum;
  showNotification: boolean;
}
