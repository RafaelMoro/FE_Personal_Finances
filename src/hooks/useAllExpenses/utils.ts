import { AbbreviatedMonthsType, Expense } from '../../globalInterface';
import { RecordsLocalStorage } from '../../utils/LocalStorage/interface';
import { getAgeLocalRecord } from '../useRecords/utils';

interface GetLocalRecordsProps {
  month: AbbreviatedMonthsType;
  lastMonth: AbbreviatedMonthsType;
  currentMonth: AbbreviatedMonthsType;
  year: string;
  recordsLocalStorageSelectedAccount: RecordsLocalStorage | undefined;
}

export const getLocalRecords = ({
  month, lastMonth, currentMonth, year, recordsLocalStorageSelectedAccount,
}: GetLocalRecordsProps) => {
  const recordAge = getAgeLocalRecord({ month, lastMonth, currentMonth });
  const recordsFormatted: Expense[] = (recordsLocalStorageSelectedAccount?.records?.[recordAge] ?? [])
    .filter((record) => record.typeOfRecord === 'expense')
    .map((record) => {
      if (record.isPaid === undefined) {
        const recordFormatted: Expense = { ...record, date: new Date(record.date), isPaid: false };
        return recordFormatted;
      }
      const newRecord: Expense = { ...record, date: new Date(record.date), isPaid: record.isPaid };
      return newRecord;
    });

  if (recordAge === 'olderRecords') {
    const recordsFormattedOlderRecords: Expense[] = recordsFormatted.filter(
      (record) => record.date.getMonth() === new Date(`${year}-${month}-01`).getMonth(),
    );
    return recordsFormattedOlderRecords;
  }
  return recordsFormatted;
};
