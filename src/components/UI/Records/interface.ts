export interface Budget {
  id: number;
  name: string;
}

export type RecordType = 'Expense' | 'Income';

export interface IRecordsProps {
  shortName: string;
  description: string;
  recordType: RecordType;
  price: number;
  budgets: Budget[];
  date: Date;
}
