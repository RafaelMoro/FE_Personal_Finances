import { useState } from 'react';
import { ABBREVIATED_MONTHS, MonthsType } from '../globalInterface';
import { MONTHS } from '../constants';
import { createYearsArray } from '../utils/CreateYearsArray';

const useDate = () => {
  const dateOfToday = new Date();
  const currentMonth = ABBREVIATED_MONTHS[dateOfToday.getMonth()];
  const completeMonth = MONTHS[dateOfToday.getMonth()];
  const currentYear = String(dateOfToday.getFullYear());
  const years: string[] = createYearsArray(currentYear);

  const [month, setMonth] = useState<MonthsType>(currentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const updateYear = (newValue: string) => setYear(newValue);
  const updateMonth = (newMonth: MonthsType) => setMonth(newMonth);

  return {
    month,
    year,
    years,
    completeMonth,
    updateYear,
    updateMonth,
  };
};

export { useDate };
