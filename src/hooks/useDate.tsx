import { useState } from 'react';
import {
  ABBREVIATED_MONTHS, AbbreviatedMonthsType, CompleteMonthsType, MONTHS,
} from '../globalInterface';
import { createYearsArray } from '../utils/CreateYearsArray';

const useDate = () => {
  const dateOfToday = new Date();
  const currentMonthNumber = dateOfToday.getMonth();
  const currentMonth = ABBREVIATED_MONTHS[currentMonthNumber];
  const completeCurrentMonth = MONTHS[currentMonthNumber];

  // If we're on january, set last month as december
  const lastMonth = currentMonthNumber === 0 ? ABBREVIATED_MONTHS[11] : ABBREVIATED_MONTHS[currentMonthNumber - 1];
  // If we're on january, set last month as december
  const completeLastMonth = currentMonthNumber === 0 ? MONTHS[11] : MONTHS[currentMonthNumber - 1];
  const currentYear = String(dateOfToday.getFullYear());
  const years: string[] = createYearsArray(currentYear);

  const [month, setMonth] = useState<AbbreviatedMonthsType>(currentMonth);
  const [completeMonth, setCompleteMonth] = useState<CompleteMonthsType>(completeCurrentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const updateYear = (newValue: string) => setYear(newValue);
  const updateMonth = (newMonth: AbbreviatedMonthsType) => setMonth(newMonth);
  const updateCompleteMonth = (newMonth: CompleteMonthsType) => setCompleteMonth(newMonth);

  return {
    month,
    completeMonth,
    lastMonth,
    year,
    years,
    completeCurrentMonth,
    completeLastMonth,
    updateYear,
    updateMonth,
    updateCompleteMonth,
  };
};

export { useDate };
