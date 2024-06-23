import { CreateExpenseValues, CreateIncomeValues } from '../../components/UI/Records/interface';
import { AbbreviatedMonthsType } from '../../globalInterface';

export function isCreateExpense(values: CreateExpenseValues | CreateIncomeValues): values is CreateExpenseValues {
  return (values as CreateExpenseValues).isPaid !== undefined;
}

export const getAge = (
  { month, lastMonth, currentMonth }
  : { month: AbbreviatedMonthsType, lastMonth: AbbreviatedMonthsType, currentMonth: AbbreviatedMonthsType },
) => {
  const isLastMonth = lastMonth === month;
  const isCurrentMonth = currentMonth === month;
  return {
    isLastMonth,
    isCurrentMonth,
  };
};
