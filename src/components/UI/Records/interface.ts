import { ReactNode } from 'react';
import { AccountRecord } from '../../../globalInterface';

export interface AccountRecordUI extends Omit<AccountRecord, 'amount' | 'date'> {
  fullDate: string;
  formattedTime: string;
  amount: string;
  shortView: boolean;
}

export interface ExpenseUI extends AccountRecordUI {
  isPaid: boolean;
}

export interface IncomeUI extends AccountRecordUI {
  expensesPaid: ExpenseUI[];
}

export interface RecordProps extends Omit<AccountRecordUI, 'amount' | 'account'> {
  children: ReactNode;
}

export interface ExpenseProps {
  amount: string;
}

export interface IncomeProps {
  amount: string;
  expensesPaid: ExpenseUI[];
}

// Change this. Should take Income or expenses.
// Maybe create a interface for expenses list or income list.
export interface IRecordListProps {
  records: AccountRecordUI [];
}

export type RecordDrawerProps = Omit<AccountRecordUI, 'amount' | 'account' | '_id'>;
