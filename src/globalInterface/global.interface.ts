import { SerializedError } from '@reduxjs/toolkit';
import { SystemStateEnum } from '../enums';

export interface UserInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  sub: string;
}

export interface User {
  user: UserInfo;
  bearerToken: string;
  accessToken: string;
}

export const TYPE_OF_ACCOUNTS = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'] as const;
export type AccountType = typeof TYPE_OF_ACCOUNTS[number];

export const ABBREVIATED_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] as const;
export type AbbreviatedMonthsType = typeof ABBREVIATED_MONTHS[number];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
export type CompleteMonthsType = typeof MONTHS[number];

export interface GeneralResponse {
  data: object | null;
  error: null | SerializedError;
  message: null | string;
  success: boolean;
  version: string;
}

export interface RequestBearerTokenProps {
  bearerToken: string;
}

export interface GeneralError {
  data: GeneralResponse;
  status: number
}

// This interface is used for unit test reject responses.
export interface MockedError {
  status: string;
  error: string;
}

export interface Account {
  _id: string;
  __v: number;
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: string;
  color: string;
  sub?: string;
}

export interface IndebtedPeople {
  _id?: string;
  name: string;
  amount: string;
  amountPaid: string;
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
  icon: string;
}

export interface AccountRecord {
  _id: string;
  userId: string;
  shortName: string;
  description: string;
  amount: number;
  amountFormatted: string;
  date: Date;
  fullDate: string;
  formattedTime: string;
  category: Category;
  subCategory: string;
  tag: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  budgets: string[];
  transferId: string;
}

export interface Expense extends AccountRecord {
  isPaid: boolean;
}

export interface UpdateMultipleExpensesError {
  statusCode: number;
  message: string;
  error: string;

}

export interface Income extends AccountRecord {
  expensesPaid: Expense[];
}

export interface ExpensePaid {
  _id: string;
  shortName: string;
  amount: number;
  amountFormatted: string;
  formattedTime: string;
  fullDate: string;
  isPaid: boolean;
  date?: Date;
}

export interface AnyRecord extends AccountRecord {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

export interface MonthTotal {
  expenseTotal: string;
  incomeTotal: string;
}

export interface RecordsTotal {
  currentMonth: MonthTotal;
  lastMonth: MonthTotal;
}

export interface GlobalNotification {
  title: string;
  description: string;
  status: SystemStateEnum;
  showNotification: boolean;
}
