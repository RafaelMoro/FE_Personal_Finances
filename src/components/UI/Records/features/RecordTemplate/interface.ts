export type TypeOfRecord = 'expense' | 'income' | 'transfer';

export interface RecordTemplateProps {
  edit?: boolean;
  changeTypeIncome: () => void;
  typeOfRecord: TypeOfRecord;
}

export interface AdditionalData {
  budgets: string[];
  tag: string[];
}
