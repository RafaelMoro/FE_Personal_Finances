import { MONTHS } from '../FormatDateToString';

const todayDate = () => {
  const dateOfToday = new Date();
  const currentMonth = MONTHS[dateOfToday.getMonth()];
  const currentYear = String(dateOfToday.getFullYear());

  return { currentMonth, currentYear };
};

export { todayDate };
