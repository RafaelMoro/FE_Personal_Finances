import { RecordStatusType } from '../../aliasType';
import { TypeOfRecord } from '../../globalInterface';

export const getRecordStatus = ({ typeOfRecord, isPaid }: { typeOfRecord: TypeOfRecord, isPaid?: boolean }): RecordStatusType => {
  if (typeOfRecord === 'transfer') {
    return 'Transfer';
  }
  if (typeOfRecord === 'expense' && isPaid) {
    return 'Paid';
  }
  return 'Unpaid';
};
