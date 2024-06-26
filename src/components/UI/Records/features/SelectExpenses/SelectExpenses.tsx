import { IconButton, Typography } from '@mui/material';

import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { useDate } from '../../../../../hooks/useDate';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { SelectMonthYearValues } from '../../interface';
import { ABBREVIATED_MONTHS, ExpensePaid, MONTHS } from '../../../../../globalInterface';

import { SelectMonthYear } from './SelectMonthYear';
import { Error } from '../../../Error';
import { AppIcon } from '../../../Icons';
import { HorizontalLoader } from '../../../HorizontalLoader';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import {
  CloseDrawerContainer, ExpensesNotFoundContainer, LoadingExpensesContainer, SelectExpensesContainer,
} from '../Features.styled';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
  accountId?: string;
}

const SelectExpenses = ({
  modifySelectedExpenses, selectedExpenses = [], closeDrawer, accountId,
}: SelectExpensesProps) => {
  const {
    month, completeMonth, year, years, updateYear, updateMonth, updateCompleteMonth,
  } = useDate();
  const {
    expenses, noExpensesFound, loading, isError,
  } = useAllExpenses({ month, year, accountId });

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
          <AppIcon icon="Close" />
        </IconButton>
      </CloseDrawerContainer>
      { (!isError) && (
        <SelectMonthYear
          updateMonthYear={updateMonthAndYear}
          completeMonth={completeMonth}
          currentYear={year}
          yearsArray={years}
        />
      ) }
      { (isError) && (
        <SelectExpensesContainer>
          <Error description={ERROR_MESSAGE_GENERAL} />
        </SelectExpensesContainer>
      ) }
      { (loading) && (
      <LoadingExpensesContainer>
        <Typography variant="body2">Loading expenses...</Typography>
        <HorizontalLoader />
      </LoadingExpensesContainer>
      ) }
      { (noExpensesFound && !loading && expenses && expenses.length === 0) && (
        <ExpensesNotFoundContainer>
          <Typography align="center">{`No expenses found for this account in ${completeMonth} ${year}`}</Typography>
        </ExpensesNotFoundContainer>
      ) }
      { (!noExpensesFound && !loading && expenses && expenses.length > 0) && (
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
