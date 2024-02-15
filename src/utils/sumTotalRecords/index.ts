import { AnyRecord } from '../../globalInterface';
import { formatNumberToCurrency } from '../FormatNumberToCurrency';

export const sumTotalRecords = (records: AnyRecord[]) => {
  let expenseTotalCounter = 0;
  let incomeTotalCounter = 0;
  records.forEach((record) => {
    if (record.isPaid !== undefined) {
      expenseTotalCounter += record.amount;
      return;
    }
    incomeTotalCounter += record.amount;
  });

  const expenseTotal = formatNumberToCurrency(expenseTotalCounter);
  const incomeTotal = formatNumberToCurrency(incomeTotalCounter);

  return {
    expenseTotal,
    incomeTotal,
  };
};
