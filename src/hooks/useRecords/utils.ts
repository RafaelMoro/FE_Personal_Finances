import { CreateExpenseValues, CreateIncomeValues } from '../../components/UI/Records/interface';

export function isCreateExpense(values: CreateExpenseValues | CreateIncomeValues): values is CreateExpenseValues {
  return (values as CreateExpenseValues).isPaid !== undefined;
}
