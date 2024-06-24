import {
  ABBREVIATED_MONTHS, ExpensePaid, RecordRedux, AnyRecord,
} from '../../globalInterface';

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

export const transformRecordReduxtoAnyRecord = (recordSaved: RecordRedux) => {
  if (recordSaved?.expensesPaid && recordSaved?.expensesPaid.length > 0) {
    const expensesPaidFormatted: ExpensePaid[] = (recordSaved?.expensesPaid ?? []).map((expensePaid) => ({
      ...expensePaid,
      date: new Date(expensePaid.date),
    }));
    return {
      ...recordSaved,
      date: new Date(recordSaved.date),
      expensesPaid: expensesPaidFormatted,
    } as AnyRecord;
  }
  return {
    ...recordSaved,
    date: new Date(recordSaved.date),
    expensesPaid: [],
  } as AnyRecord;
};

export const transformAnyRecordToRecordRedux = (record: AnyRecord) => {
  if (record?.expensesPaid && record?.expensesPaid.length > 0) {
    const expensesPaidFormatted = record?.expensesPaid.map((expensePaid) => ({
      ...expensePaid,
      date: expensePaid.date.toISOString(),
    }));
    return {
      ...record,
      date: record.date.toISOString(),
      expensesPaid: expensesPaidFormatted,
    } as RecordRedux;
  }
  return {
    ...record,
    date: record.date.toISOString(),
    expensesPaid: [],
  } as RecordRedux;
};
