import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import {
  Category, ExpensePaid, AnyRecord, IndebtedPeople,
} from '../../../globalInterface';

export interface DrawerChipContainerProps {
  afterContent: string;
}

export interface RecordTableProps {
  isGrid?: boolean;
}

export interface RecordStatusProps {
  isPaid?: boolean;
}

export interface RecordListProps {
  records: AnyRecord [];
}

export interface RecordDrawerProps {
  record: AnyRecord;
  amountShown: ReactNode;
  expensesPaid: ExpensePaid[];
  onCloseCb?: () => void;
  openDeleteRecordModal?: () => void;
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
  date: Dayjs;
}

export interface CreateExpenseValues extends Omit<CreateRecordValues, 'amount'> {
  amount: number;
  tag: string[];
  budgets: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
}

export interface CreateIncomeValues extends CreateExpenseValues {
  expensesPaid: string[];
}

export interface CreateEditExpenseResponse extends AnyRecord {
  message?: string;
}

export interface CreateIncomeResponse extends AnyRecord {
  message?: string;
}

// Same response for income and expense
export interface DeleteRecordResponse {
  message: string | null;
  error: null | string;
  deleteRecordSuccess: boolean;
}

// Select Month and year on select expense
export interface SelectMonthYearValues {
  month: string;
  year: string;
}

export interface ListExpandableContainerProps {
  backgroundColor: string;
  color: string;
}
