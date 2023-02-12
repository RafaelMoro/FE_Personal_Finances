import { ReactNode } from 'react';

export interface Budget {
  id: number;
  name: string;
}

export type RecordType = 'Expense' | 'Income';

export interface IRecord {
  id: number;
  shortName: string;
  description: string;
  recordType: RecordType;
  price: number;
  budgets: Budget[];
  date: Date;
  children?: ReactNode;
}

export interface IIncomeRecordProps {
  payedLinkedRecords: IRecord[];
  shortView: boolean;
}
export type TRecordProps = Omit<IRecord, 'id'>;

export interface IRecordListProps {
  records: IRecord[];
}
