import { Expense } from '../../globalInterface';

export interface UseAllExpensesProps {
  month: string;
  year: string;
}

export interface GetExpensesNotPaidResponse {
  message: null | string;
  expenses: Expense[];
}
