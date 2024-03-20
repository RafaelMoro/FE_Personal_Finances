export interface RecordTemplateProps {
  edit?: boolean;
}

export interface AdditionalData {
  budgets: string[];
  tag: string[];
}

export type TypeOfRecord = 'expense' | 'income' | 'transfer';
