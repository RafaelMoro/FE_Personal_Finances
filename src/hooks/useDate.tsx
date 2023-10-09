import { useState } from 'react';
import {
  ABBREVIATED_MONTHS, AbbreviatedMonthsType, CompleteMonthsType, MONTHS,
} from '../globalInterface';
import { createYearsArray } from '../utils/CreateYearsArray';

const useDate = () => {
  const dateOfToday = new Date();
  const currentMonth = ABBREVIATED_MONTHS[dateOfToday.getMonth()];
  const completeCurrentMonth = MONTHS[dateOfToday.getMonth()];
  const lastMonth = ABBREVIATED_MONTHS[dateOfToday.getMonth() - 1];
  const completeLastMonth = MONTHS[dateOfToday.getMonth() - 1];
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
