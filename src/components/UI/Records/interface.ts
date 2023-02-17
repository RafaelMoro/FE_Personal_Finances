export interface Budget {
  id: number;
  name: string;
}

export type RecordType = 'Expense' | 'Income';

export interface IRecordPayed {
  id: string;
  shortName: string;
  description: string;
  price: number;
  date: Date;
}

export interface IRecord {
  id: string;
  shortName: string;
  description: string;
  recordType: RecordType;
  price: number;
  budgets: Budget[];
  date: Date;
  shortView?: boolean;
  linkedPayedRecords?: IRecordPayed[];
}

export interface IIncomeRecordProps {
  payedLinkedRecords: IRecordPayed[];
  shortView?: boolean;
}
export type TRecordProps = Omit<IRecord, 'id'>;

export interface IRecordListProps {
  records: IRecord[];
}
