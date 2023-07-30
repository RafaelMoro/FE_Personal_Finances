/* eslint-disable no-console */
import { formatNumberToCurrency } from '../../../../../utils';
import { ExpensePaid } from '../../interface';
import { ExpensePaidTable, Order } from './interface';

export function orderExpenses(expenses: readonly ExpensePaid[], order: Order, orderBy: keyof ExpensePaidTable): ExpensePaid[] {
  const formattedExpenses = [...expenses];

  if (orderBy === 'shortName') {
    formattedExpenses.sort((firstItem, secondItem) => firstItem.shortName.localeCompare(secondItem.shortName));
    if (order === 'desc') {
      return formattedExpenses.reverse();
    }
    return formattedExpenses;
  }

  if (orderBy === 'fullDate' || orderBy === 'date' || orderBy === 'formattedTime') {
    formattedExpenses.sort((firstItem, secondItem) => {
      if (firstItem.date && secondItem.date) {
        return (secondItem?.date.valueOf() || 1) - (firstItem?.date.valueOf() || 0);
      }
      return firstItem.shortName.localeCompare(secondItem.shortName);
    });

    if (order === 'desc') return formattedExpenses;
    return formattedExpenses.reverse();
  }

  // Order by amount by default.
  const expensesTranformed = expenses.map((item) => {
    const slicedAmount = item.amount.slice(1, item.amount.length);
    const amountAsNumber = Number(slicedAmount);
    return { ...item, amount: amountAsNumber };
  });
  expensesTranformed.sort((firstItem, secondItem) => firstItem.amount - secondItem.amount);
  const expensesOrdered = expensesTranformed.map((item) => {
    const formattedAmount = formatNumberToCurrency(item.amount);
    return { ...item, amount: formattedAmount };
  });
  if (order === 'desc') return expensesOrdered.reverse();
  return expensesOrdered;
}
