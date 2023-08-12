import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { ExpensePaid, SelectMonthYearValues } from '../../interface';
import { ABBREVIATED_MONTHS } from '../../../../../globalInterface';
import { MONTHS } from '../../../../../constants';
import { Loader } from '../../../../../animations/Loader';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph } from '../../../../../styles';
import { SelectExpensesContainer } from '../Features.styled';
import { SelectMonthYear } from './SelectMonthYear';
import { useDate } from '../../../../../hooks/useDate';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
}

const SelectExpenses = ({
  modifySelectedExpenses, selectedExpenses = [], closeDrawer,
}: SelectExpensesProps) => {
  const {
    month, year, years, completeMonth, updateYear, updateMonth,
  } = useDate();
  const {
    expenses, noExpensesFound, error, loading,
  } = useAllExpenses({ month, year });

  const updateMonthAndYear = ({ month: newMonth, year: newYear }: SelectMonthYearValues) => {
    const monthIndex = MONTHS.indexOf(newMonth);
    updateMonth(ABBREVIATED_MONTHS[monthIndex]);
    updateYear(newYear);
  };

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
  if (noExpensesFound && expenses.length === 0) {
    return (
      <SelectExpensesContainer>
        <SelectMonthYear
          updateMonthYear={updateMonthAndYear}
          completeMonth={completeMonth}
          currentYear={year}
          yearsArray={years}
        />
        <Paragraph>{`No expenses found for this account in ${completeMonth} ${year}`}</Paragraph>
      </SelectExpensesContainer>
    );
  }
  return (
    <>
      <SelectMonthYear
        updateMonthYear={updateMonthAndYear}
        completeMonth={completeMonth}
        currentYear={year}
        yearsArray={years}
      />
      <SelectExpensesTable
        expenses={expenses}
        modifySelectedExpenses={modifySelectedExpenses}
        selectedExpenses={selectedExpenses}
        closeDrawer={closeDrawer}
      />
    </>
  );
};

export { SelectExpenses };
