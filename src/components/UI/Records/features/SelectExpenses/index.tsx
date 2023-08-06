import { useState } from 'react';

import { useAllExpenses } from '../../../../../hooks/useAllExpenses';
import { ExpensePaid, SelectMonthYearValues } from '../../interface';
import { ABBREVIATED_MONTHS, MONTHS } from '../../../../../constants';
import { Loader } from '../../../../../animations/Loader';
import { SelectExpensesTable } from '../SelectExpensesTable/SelectExpensesTable';
import { Paragraph } from '../../../../../styles';
import { SelectExpensesContainer } from '../Features.styled';
import { todayDate } from '../../../../../utils/TodayDate';
import { createYearsArray } from '../../../../../utils/CreateYearsArray';
import { SelectMonthYear } from './SelectMonthYear';

interface SelectExpensesProps {
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  selectedExpenses: ExpensePaid[];
  closeDrawer: () => void;
}

const SelectExpenses = ({
  modifySelectedExpenses, selectedExpenses = [], closeDrawer,
}: SelectExpensesProps) => {
  const { currentYear, currentMonth } = todayDate();
  const [month, setMonth] = useState(currentMonth);
  const completeMonth = MONTHS[ABBREVIATED_MONTHS.indexOf(month)];
  const [year, setYear] = useState(currentYear);
  const {
    expenses, noExpensesFound, error, loading,
  } = useAllExpenses({ month, year });
  const YEARS = createYearsArray();

  const updateMonth = (newMonth: string) => setMonth(newMonth);
  const updateYear = (newYear: string) => setYear(newYear);

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
          yearsArray={YEARS}
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
        yearsArray={YEARS}
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
