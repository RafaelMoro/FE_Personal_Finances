import { CreateExpenseValues, CreateIncomeValues } from '../../components/UI/Records/interface';
import { AnyRecord, ExpensePaid } from '../../globalInterface';

export interface UseRecordsProps {
  recordToBeDeleted?: AnyRecord;
  deleteRecordExpense?: boolean;
  closeDeleteRecordModalCb?: () => void;
  closeDrawer?: () => void;
}

export interface UpdateAmountAccountProps {
  amount: number;
  isExpense: boolean;
  deleteRecord?: boolean;
}

export interface UpdateAmountAccountOnEditProps extends Omit<UpdateAmountAccountProps, 'deleteRecord'> {
  previousAmount: number;
}

export interface ShowErrorNotificationProps {
  errorMessage: string;
  action: string;
  goToDashboard?: boolean;
}

export interface UpdateRecordsOnEditProps {
  date: Date;
  recordEdited: AnyRecord;
}

export interface UpdateRecordsOnDeleteProps {
  date: Date;
  deletedRecordId: string;
}

export interface EditExpenseProps {
  values: CreateExpenseValues;
  recordId: string;
  amountTouched: boolean;
  previousAmount: number;
  userId: string;
}

export interface EditIncomeProps {
  values: CreateIncomeValues;
  recordId: string;
  amountTouched: boolean;
  previousAmount: number;
  previousExpensesRelated: ExpensePaid[];
}
