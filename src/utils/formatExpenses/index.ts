import { AnyRecord } from '../../components/UI/Records/interface';
import { ExpenseInterface } from '../../globalInterface';
import { formatDateToString } from '../FormatDateToString';
import { formatNumberToCurrency } from '../FormatNumberToCurrency';

interface FormatExpensesProps {
  records: ExpenseInterface[]
}

// eslint-disable-next-line max-len
export const formatExpenses = ({ records }: FormatExpensesProps): AnyRecord[] => records.map((record) => {
  const { fullDate, formattedTime } = formatDateToString(record.date);
  return {
    ...record,
    amount: formatNumberToCurrency(record.amount),
    fullDate,
    formattedTime,
  };
});
