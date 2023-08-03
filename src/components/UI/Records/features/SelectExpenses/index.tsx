import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { ExpensePaid } from '../../interface';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph } from '../../../../../styles';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
}

const SelectExpenses = ({ modifySelectedExpenses, selectedExpenses = [], closeDrawer }: SelectExpensesProps) => {
  const { expenses, noExpensesFound, error } = useAllExpenses();

  if (error !== 'No error found') {
    return (<Paragraph>An error was found, try again later.</Paragraph>);
  }
  if (noExpensesFound) {
    return (<Paragraph>No expenses found for this account</Paragraph>);
  }
  return (
    <SelectExpensesTable
      expenses={expenses}
      modifySelectedExpenses={modifySelectedExpenses}
      selectedExpenses={selectedExpenses}
      closeDrawer={closeDrawer}
    />
  );
};

export { SelectExpenses };
