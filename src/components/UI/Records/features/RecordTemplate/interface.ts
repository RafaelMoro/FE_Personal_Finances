export type TypeOfRecord = 'expense' | 'income' | 'transfer';

export interface RecordTemplateProps {
  edit?: boolean;
  typeOfRecord: TypeOfRecord;
}
