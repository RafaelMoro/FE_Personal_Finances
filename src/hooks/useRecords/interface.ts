import { RecordAgeCategory } from '../../aliasType';
import { CreateExpenseValues, CreateIncomeValues } from '../../components/UI/Records/interface';
import { AnyRecord, ExpensePaid } from '../../globalInterface';

export interface UseRecordsProps {
  recordToBeDeleted?: AnyRecord;
  deleteRecordExpense?: boolean;
  closeDeleteRecordModalCb?: () => void;
  closeDrawer?: () => void;
}

export interface Actions {
  create: string;
  edit: string;
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
  userId: string;
  amountTouched: boolean;
  previousAmount: number;
  previousExpensesRelated: ExpensePaid[];
}

export interface UpdateTotalCurrencyProps {
  currentTotal: string;
  newAmount: number;
  recordAgeCategory: RecordAgeCategory;
  editRecord?: boolean;
  previousAmount?: number;
}
