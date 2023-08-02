import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { ExpensePaid } from '../../interface';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
}

const SelectExpenses = ({ modifySelectedExpenses, selectedExpenses = [] }: SelectExpensesProps) => {
  const { expenses, noExpensesFound, error } = useAllExpenses();

  if (error !== 'No error found') {
    return (<p>An error was found, try again later.</p>);
  }
  if (noExpensesFound) {
    return (<p>No expenses found for this account</p>);
  }
  return (
    <SelectExpensesTable
      expenses={expenses}
      modifySelectedExpenses={modifySelectedExpenses}
      selectedExpenses={selectedExpenses}
    />
  );
};

export { SelectExpenses };
