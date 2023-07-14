export interface RecordTemplateProps {
  edit?: boolean;
}

export interface AdditionalData {
  budgets: string[];
  tags: string[];
}

export type TypeOfRecord = 'expense' | 'income';
