import { ABBREVIATED_MONTHS } from '../../globalInterface';

export const formatMockDate = (date: Date) => {
  const month = ABBREVIATED_MONTHS[date.getMonth()];
  const day = date.getDate();
  const currentDate = `${month} ${day}`;

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const hourString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');
  const twelveHourPeriod = hours >= 0 && hours <= 11 ? 'am' : 'pm';
  const formattedTime = `${hourString}:${minutesString}${twelveHourPeriod}`;

  return { currentDate, formattedTime };
};
