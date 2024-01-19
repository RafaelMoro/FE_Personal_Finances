import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import {
  Category, ExpensePaid, AnyRecord, IndebtedPeople, CompleteMonthsType,
  GeneralResponse,
} from '../../../globalInterface';

export interface RecordProps {
  record: AnyRecord;
  backgroundColor: string;
}

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
  chipColor: string;
  amountShown: ReactNode;
  expensesPaid: ExpensePaid[];
  onCloseCb?: () => void;
  openDeleteRecordModal?: () => void;
}

export interface IncomeAndExpensesResponse extends Omit<GeneralResponse, 'data'> {
  data: AnyRecord [];
}

export interface CategoriesResponse extends Omit<GeneralResponse, 'data'> {
  data: Category[];
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

export interface RecordOperationResponse extends Omit<GeneralResponse, 'data'> {
  data: AnyRecord;
}

// Same response for income and expense
export interface DeleteRecordResponse extends Omit<GeneralResponse, 'data'> {
  data: AnyRecord;
}

// Select Month and year on select expense
export interface SelectMonthYearValues {
  month: CompleteMonthsType;
  year: string;
}

export interface ListExpandableContainerProps {
  backgroundColor: string;
  color: string;
}
