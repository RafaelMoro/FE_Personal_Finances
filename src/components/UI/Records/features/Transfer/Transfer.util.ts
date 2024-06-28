import { ExpensePaid, AnyRecord } from '../../../../../globalInterface';
import { AccountUI } from '../../../Account/Account.interface';
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

interface GetOriginAccountProps {
  isIncome: boolean;
  selectedAccount: AccountUI | null;
  recordToBeEdited?: AnyRecord | null;
  edit?: boolean;
}

export const getOriginAccount = ({
  isIncome, selectedAccount, recordToBeEdited, edit = false,
}: GetOriginAccountProps) => {
  if (edit && recordToBeEdited) {
    return !isIncome ? recordToBeEdited.account : recordToBeEdited.transferRecord?.account ?? '';
  }
  if (selectedAccount) {
    return selectedAccount?._id;
  }
  return '';
};
