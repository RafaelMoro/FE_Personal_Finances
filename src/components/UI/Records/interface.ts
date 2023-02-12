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
}
export type IRecordProps = Omit<IRecord, 'id'>;

export interface IRecordListProps {
  records: IRecord[];
}
