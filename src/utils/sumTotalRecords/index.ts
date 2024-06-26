import { AnyRecord } from '../../globalInterface';
import { formatValueToCurrency } from '../FormatNumberToCurrency';

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

  const expenseTotal = formatValueToCurrency({ amount: expenseTotalCounter });
  const incomeTotal = formatValueToCurrency({ amount: incomeTotalCounter });

  return {
    expenseTotal,
    incomeTotal,
  };
};
