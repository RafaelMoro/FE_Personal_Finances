import { ReactNode } from 'react';
import { AccountRecord, Category } from '../../../globalInterface';

export interface DrawerChipContainerProps {
  afterContent: string;
}

export interface RecordTableProps {
  isGrid?: boolean;
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

export interface RecordProps extends Omit<AccountRecord, 'account' | 'date'> {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

export interface RecordListProps {
  records: AnyRecord [];
}

export interface RecordDrawerProps extends Omit<AccountRecord, 'amount' | 'account' | '_id' | 'date'> {
  amountShown: ReactNode;
  expensesPaid: ExpensePaid[];
}

export interface IncomeAndExpensesResponse {
  records: AnyRecord []
  message: string;
  error?: boolean;
}

export interface CategoriesResponse {
  categories: Category[];
  error: boolean;
}
// Check the IndebtedPeople array and fields that may be different.
export interface CreateRecordValues {
  amount: string;
  shortName: string;
  description: string;
  category: string;
  subCategory: string;
  isPaid?: boolean;
  date: Date;
}
