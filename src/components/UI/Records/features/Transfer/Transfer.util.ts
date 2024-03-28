import { ExpensePaid } from '../../../../../globalInterface';
import { CreateTransferValues } from '../../interface';

export const getValuesIncomeAndExpense = ({ values, expensesSelected }: { values: CreateTransferValues, expensesSelected: ExpensePaid[] }) => {
  const typeOfRecordValue = 'transfer';
  const {
    isPaid, amount, destinationAccount, originAccount, ...restValues
  } = values;
  const amountToNumber = Number(amount);
  const newValuesExpense = {
    ...restValues,
    amount: amountToNumber,
    indebtedPeople: [],
    account: values.originAccount,
    typeOfRecord: typeOfRecordValue,
    isPaid: true,
  };
  const newValuesIncome = {
    ...restValues,
    amount: amountToNumber,
    indebtedPeople: [],
    expensesPaid: expensesSelected,
    account: values.destinationAccount,
    typeOfRecord: typeOfRecordValue,
  };
  return { newValuesIncome, newValuesExpense };
};
