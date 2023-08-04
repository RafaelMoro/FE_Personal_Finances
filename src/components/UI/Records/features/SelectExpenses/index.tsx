import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { ExpensePaid } from '../../interface';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph } from '../../../../../styles';
import { SelectExpensesContainer } from '../Features.styled';
import { Loader } from '../../../../../animations/Loader';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
}

const SelectExpenses = ({ modifySelectedExpenses, selectedExpenses = [], closeDrawer }: SelectExpensesProps) => {
  const {
    expenses, noExpensesFound, error, loading,
  } = useAllExpenses();

  if (loading) {
    return (
      <SelectExpensesContainer>
        <Paragraph>Loading expenses...</Paragraph>
        <Loader />
      </SelectExpensesContainer>
    );
  }

  if (error !== 'No error found') {
    return (
      <SelectExpensesContainer>
        <Paragraph>An error was found, try again later.</Paragraph>
      </SelectExpensesContainer>
    );
  }
  if (noExpensesFound) {
    return (
      <SelectExpensesContainer>
        <Paragraph>No expenses found for this account</Paragraph>
      </SelectExpensesContainer>
    );
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
