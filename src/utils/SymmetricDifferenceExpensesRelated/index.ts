import { ExpensePaid } from '../../globalInterface';

export function symmetricDifferenceExpensesRelated(oldArray: ExpensePaid[], newArray: ExpensePaid[]) {
  const getId = (expense: ExpensePaid) => expense._id;
  const firstDifference = oldArray.filter((oldExpense) => !newArray.some((newExpense) => getId(oldExpense) === getId(newExpense)));
  const secondDifference = newArray.filter((newExpense) => !oldArray.some((oldExpense) => getId(newExpense) === getId(oldExpense)));

  return {
    oldRecords: firstDifference,
    newRecords: secondDifference,
  };
}
