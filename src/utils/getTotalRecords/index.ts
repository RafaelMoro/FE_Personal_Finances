import { AnyRecord } from '../../globalInterface';

interface GetTotalRecordsProps {
  records: AnyRecord[];
  isIncome?: boolean;
}

export const getTotalRecords = ({ records, isIncome = false }: GetTotalRecordsProps) => {
  if (isIncome) {
    return records.filter((record) => record.expensesPaid !== undefined)
      .map((record) => record.amount)
      .reduce((accumulator, recordAmount) => accumulator + recordAmount, 0);
  }

  return records.filter((record) => record.isPaid !== undefined)
    .map((record) => record.amount)
    .reduce((accumulator, recordAmount) => accumulator + recordAmount, 0);
};
