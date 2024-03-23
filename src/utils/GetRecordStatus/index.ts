import { RecordStatusType } from '../../aliasType';

export const getRecordStatus = ({ isPaid, transferId }: { isPaid: boolean | undefined, transferId: string }): RecordStatusType => {
  if (transferId) {
    return 'Transfer';
  }
  if (isPaid) {
    return 'Paid';
  }
  return 'Unpaid';
};
