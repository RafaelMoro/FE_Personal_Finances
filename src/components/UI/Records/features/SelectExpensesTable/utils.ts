/* eslint-disable no-console */
import { formatNumberToCurrency } from '../../../../../utils';
import { ExpensePaid } from '../../interface';
import { ExpensePaidTable, Order } from './interface';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  // console.log('a[orderBy]', a[orderBy]);
  // console.log('b[orderBy]', b[orderBy]);
  if (b[orderBy] < a[orderBy]) {
    console.log('primer if');
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    console.log('segundo if');
    return 1;
  }
  console.log('0');
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (
  a: {
    [key in Key]: number | string
  },
  b: {
    [key in Key]: number | string
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy);
}

// when the this function is called to order the elements of the table, the callback comparator is getComparator
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  console.log('array', array);
  const stabilizedArray = array.map((item, index) => [item, index] as [T, number]);
  console.log('stabilizedArray first', stabilizedArray);
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  console.log('stabilizedArray secondly', stabilizedArray);
  return stabilizedArray.map((item) => item[0]);
}

export function orderExpenses(expenses: readonly ExpensePaid[], order: Order, orderBy: keyof ExpensePaidTable): ExpensePaid[] {
  if (order === 'desc') {
    // ordenra los descendente
  }
  const copiedExpenses = [...expenses];
  const expensesHaveDate = expenses.every((expense) => expense?.date);
  if (orderBy === 'shortName') {
    return copiedExpenses.sort((firstItem, secondItem) => firstItem.shortName.localeCompare(secondItem.shortName));
  }

  if (orderBy === 'fullDate' && expensesHaveDate) {
    return copiedExpenses.sort((firstItem, secondItem) => secondItem?.date - firstItem?.date).reverse();
  }

  const formattedExpenses = expenses.map((item) => {
    const slicedAmount = item.amount.slice(1, item.amount.length);
    const amountAsNumber = Number(slicedAmount);
    return { ...item, amount: amountAsNumber };
  });
  formattedExpenses.sort((firstItem, secondItem) => firstItem.amount - secondItem.amount);
  return formattedExpenses.map((item) => {
    const formattedAmount = formatNumberToCurrency(item.amount);
    return { ...item, amount: formattedAmount };
  });
}
