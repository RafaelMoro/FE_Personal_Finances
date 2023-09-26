import { AnyRecord } from '../../globalInterface';

export interface UseRecordsProps {
  recordToBeDeleted?: AnyRecord;
  deleteRecordExpense?: boolean;
  closeDeleteRecordModalCb?: () => void;
  closeDrawer?: () => void;
}

export interface UpdateAmountAccountProps {
  amount: string;
  isExpense: boolean;
  deleteRecord?: boolean;
}

export interface ShowErrorNotificationProps {
  errorMessage: string;
  action: string;
  goToDashboard?: boolean;
}

export interface UpdateRecordsProps {
  date: Date;
  newRecord?: AnyRecord;
  deleteRecord?: boolean;
  deletedRecordId?: string;
}
