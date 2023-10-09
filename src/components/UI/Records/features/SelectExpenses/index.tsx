import { IconButton } from '@mui/material';
import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { SelectMonthYearValues } from '../../interface';
import { ABBREVIATED_MONTHS, ExpensePaid, MONTHS } from '../../../../../globalInterface';
import { Loader } from '../../../../../animations/Loader';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph } from '../../../../../styles';
import {
  CloseDrawerContainer, ExpensesNotFoundContainer, LoadingExpensesContainer, SelectExpensesContainer,
} from '../Features.styled';
import { SelectMonthYear } from './SelectMonthYear';
import { useDate } from '../../../../../hooks/useDate';
import { Error } from '../../../Error';
import { CloseIcon } from '../../../Icons';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
}

const SelectExpenses = ({
  modifySelectedExpenses, selectedExpenses = [], closeDrawer,
}: SelectExpensesProps) => {
  const {
    month, completeMonth, year, years, updateYear, updateMonth, updateCompleteMonth,
  } = useDate();
  const {
    expenses, noExpensesFound, error, loading,
  } = useAllExpenses({ month, year });

  const updateMonthAndYear = ({ month: newMonth, year: newYear }: SelectMonthYearValues) => {
    const monthIndex = MONTHS.indexOf(newMonth);
    updateMonth(ABBREVIATED_MONTHS[monthIndex]);
    updateCompleteMonth(newMonth);
    updateYear(newYear);
  };

  if (error !== 'No error found') {
    return (
      <SelectExpensesContainer>
        <Error description="An error was found, try again later" />
      </SelectExpensesContainer>
    );
  }
  return (
    <>
      <CloseDrawerContainer>
        <IconButton onClick={closeDrawer}>
          <CloseIcon />
        </IconButton>
      </CloseDrawerContainer>
      <SelectMonthYear
        updateMonthYear={updateMonthAndYear}
        completeMonth={completeMonth}
        currentYear={year}
        yearsArray={years}
      />
      { (loading) && (
      <LoadingExpensesContainer>
        <Paragraph>Loading expenses...</Paragraph>
        <Loader />
      </LoadingExpensesContainer>
      ) }
      { (noExpensesFound && !loading && expenses.length === 0) && (
        <ExpensesNotFoundContainer>
          <Paragraph align="center">{`No expenses found for this account in ${completeMonth} ${year}`}</Paragraph>
        </ExpensesNotFoundContainer>
      ) }
      { (!noExpensesFound && !loading && expenses.length > 0) && (
        <SelectExpensesTable
          expenses={expenses}
          modifySelectedExpenses={modifySelectedExpenses}
          selectedExpenses={selectedExpenses}
          closeDrawer={closeDrawer}
        />
      ) }
    </>
  );
};

export { SelectExpenses };
