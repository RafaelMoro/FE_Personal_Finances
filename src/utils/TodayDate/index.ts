import { ABBREVIATED_MONTHS, MONTHS } from '../../constants';

const todayDate = () => {
  const dateOfToday = new Date();
  const currentMonth = ABBREVIATED_MONTHS[dateOfToday.getMonth()];
  const completeMonth = MONTHS[dateOfToday.getMonth()];
  const currentYear = String(dateOfToday.getFullYear());

  return { currentMonth, completeMonth, currentYear };
};

export { todayDate };
