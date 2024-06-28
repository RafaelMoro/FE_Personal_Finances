import { AbbreviatedMonthsType, Expense, GeneralResponse } from '../../globalInterface';

export interface UseAllExpensesProps {
  month: AbbreviatedMonthsType;
  year: string;
  accountId?: string;
}

export interface GetExpensesNotPaidResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    records: Expense[];
  };
}
