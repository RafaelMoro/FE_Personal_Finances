import { ABBREVIATED_MONTHS } from '../../globalInterface';

export const formatDateToString = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const hour = date.getHours();
  const hourString = String(hour).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const fullDate = `${ABBREVIATED_MONTHS[month]} ${day}`;
  const monthFormatted = ABBREVIATED_MONTHS[month];
  const twelveHourPeriod = hour >= 0 && hour <= 11 ? 'am' : 'pm';
  const formattedTime = `${hourString}:${minutes}${twelveHourPeriod}`;

  return {
    fullDate,
    formattedTime,
    monthFormatted,
  };
};
