import { ReactNode } from 'react';
// eslint-disable-next-line import/no-cycle
import { AccountRecord } from '../../../globalInterface';

export interface DrawerChipContainerProps {
  afterContent: string;
}

export interface AccountRecordUI extends Omit<AccountRecord, 'amount' | 'date'> {
  fullDate: string;
  formattedTime: string;
  amount: string;
}

export interface ExpenseUI extends AccountRecordUI {
  isPaid: boolean;
}

export interface IncomeUI extends AccountRecordUI {
  expensesPaid: ExpenseUI[];
}

export interface ExpensePaid {
  _id: string;
  shortName: string;
  amount: string;
  fullDate: string;
  formattedTime: string;
}

export interface AnyRecord extends AccountRecordUI {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

export interface RecordProps extends Omit<AccountRecordUI, 'account'> {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

export interface RecordListProps {
  records: AnyRecord [];
}

export interface RecordDrawerProps extends Omit<AccountRecordUI, 'amount' | 'account' | '_id'> {
  amountShown: ReactNode;
  expensesPaid: ExpensePaid[];
}

export interface IncomeAndExpensesResponse {
  records: AnyRecord []
  message: string;
  error?: boolean;
}

export interface Category {
  _id: string;
  __v: number;
  categoryName: string;
  subCategories: string[];
}

export interface CategoriesResponse {
  categories: Category[];
  error: boolean;
}
