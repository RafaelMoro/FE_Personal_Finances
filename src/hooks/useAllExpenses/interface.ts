import { Expense, GeneralResponse } from '../../globalInterface';

export interface UseAllExpensesProps {
  month: string;
  year: string;
}

export interface GetExpensesNotPaidResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    records: Expense[];
  };
}
