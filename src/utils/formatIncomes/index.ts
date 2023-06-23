import { AnyRecord } from '../../components/UI/Records/interface';
import { Income } from '../../globalInterface';
import { formatDateToString } from '../FormatDateToString';
import { formatNumberToCurrency } from '../FormatNumberToCurrency';

interface FormatExpensesProps {
  records: Income[]
}

// eslint-disable-next-line max-len
export const formatIncomes = ({ records }: FormatExpensesProps): AnyRecord[] => records.map((record) => {
  const { expensesPaid = [] } = record;
  const { fullDate, formattedTime } = formatDateToString(record.date);
  const expensesPaidformatted = expensesPaid.map((expense) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, shortName, amount } = expense;
    const {
      fullDate: fullDateExpense,
      formattedTime: formattedTimeExpense,
    } = formatDateToString(expense.date);
    return {
      _id,
      shortName,
      amount: formatNumberToCurrency(amount),
      fullDate: fullDateExpense,
      formattedTime: formattedTimeExpense,
    };
  });
  return {
    ...record,
    amount: formatNumberToCurrency(record.amount),
    fullDate,
    formattedTime,
    expensesPaid: expensesPaidformatted,
  };
});
