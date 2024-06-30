import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  ABBREVIATED_MONTHS, AbbreviatedMonthsType, CompleteMonthsType, MONTHS,
} from '../globalInterface';
import { createYearsArray } from '../utils/CreateYearsArray';
import { SelectMonthYearValues } from '../components/UI/Records/interface';

dayjs.extend(utc);
dayjs.extend(timezone);

const useDate = () => {
  const dateOfToday = dayjs().tz('America/Mexico_City');
  const currentMonthNumber = dateOfToday.month();
  const currentMonth = ABBREVIATED_MONTHS[currentMonthNumber];
  const completeCurrentMonth = MONTHS[currentMonthNumber];

  // If we're on january, set last month as december
  const lastMonth = currentMonthNumber === 0 ? ABBREVIATED_MONTHS[11] : ABBREVIATED_MONTHS[currentMonthNumber - 1];
  // If we're on january, set last month as december
  const completeLastMonth = currentMonthNumber === 0 ? MONTHS[11] : MONTHS[currentMonthNumber - 1];
  const currentYear = String(dateOfToday.year());
  const years: string[] = createYearsArray(currentYear);

  const [month, setMonth] = useState<AbbreviatedMonthsType>(currentMonth);
  const [completeMonth, setCompleteMonth] = useState<CompleteMonthsType>(completeCurrentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const updateYear = (newValue: string) => setYear(newValue);
  const updateMonth = (newMonth: AbbreviatedMonthsType) => setMonth(newMonth);
  const updateCompleteMonth = (newMonth: CompleteMonthsType) => setCompleteMonth(newMonth);

  const updateMonthAndYear = ({ month: newMonth, year: newYear }: SelectMonthYearValues) => {
    const monthIndex = MONTHS.indexOf(newMonth);
    updateMonth(ABBREVIATED_MONTHS[monthIndex]);
    updateCompleteMonth(newMonth);
    updateYear(newYear);
  };

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
    updateMonthAndYear,
  };
};

export { useDate };
