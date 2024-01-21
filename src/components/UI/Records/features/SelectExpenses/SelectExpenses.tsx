import { IconButton } from '@mui/material';

import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { useDate } from '../../../../../hooks/useDate';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { SelectMonthYearValues } from '../../interface';
import { ABBREVIATED_MONTHS, ExpensePaid, MONTHS } from '../../../../../globalInterface';

import { SelectMonthYear } from './SelectMonthYear';
import { Error } from '../../../Error';
import { CloseIcon } from '../../../Icons';
import { Loader } from '../../../../../animations/Loader';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph } from '../../../../../styles';
import {
  CloseDrawerContainer, ExpensesNotFoundContainer, LoadingExpensesContainer, SelectExpensesContainer,
} from '../Features.styled';

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

  return (
    <>
      <CloseDrawerContainer>
        <IconButton onClick={closeDrawer}>
          <CloseIcon />
        </IconButton>
      </CloseDrawerContainer>
      { (error === 'No error found') && (
        <SelectMonthYear
          updateMonthYear={updateMonthAndYear}
          completeMonth={completeMonth}
          currentYear={year}
          yearsArray={years}
        />
      ) }
      { (error !== 'No error found') && (
        <SelectExpensesContainer>
          <Error description={ERROR_MESSAGE_GENERAL} />
        </SelectExpensesContainer>
      ) }
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
