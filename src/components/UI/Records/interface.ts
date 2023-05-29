import { ReactNode } from 'react';
import { AccountRecord } from '../../../globalInterface';

export interface AccountRecordUI extends Omit<AccountRecord, 'amount' | 'date'> {
  fullDate: string;
  formattedTime: string;
  amount: string;
  shortView: boolean;
}

export interface ExpenseUI extends Omit<AccountRecordUI, 'account'> {
  isPaid: boolean;
}

export interface IncomeUI extends AccountRecordUI {
  expensesPaid: ExpenseUI[];
}

export interface AnyRecord extends AccountRecordUI {
  isPaid?: boolean;
  expensesPaid?: ExpenseUI[];
}

export interface RecordProps extends Omit<AccountRecordUI, 'account'> {
  isPaid?: boolean;
}

export interface IncomeProps {
  amount: string;
  expensesPaid: ExpenseUI[];
}

// Change this. Should take Income or expenses.
// Maybe create a interface for expenses list or income list.
export interface IRecordListProps {
  records: AnyRecord [];
}

export interface RecordDrawerProps extends Omit<AccountRecordUI, 'amount' | 'account' | '_id'> {
  amountShown: ReactNode;
}
