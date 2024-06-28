import { RecordAgeCategory } from '../../aliasType';
import { CreateExpenseValues, CreateIncomeValues } from '../../components/UI/Records/interface';
import {
  AnyRecord, ExpensePaid, ExpensePaidRedux, RecordRedux,
} from '../../globalInterface';
import { RecordAgeStatus, RecordAgeStatusKey, RecordsLocalStorage } from '../../utils/LocalStorage/interface';

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
  accountId: string;
  deleteRecord?: boolean;
  isGuestUser?: boolean;
}

export interface UpdateAmountAccountOnEditProps extends Omit<UpdateAmountAccountProps, 'deleteRecord'> {
  previousAmount: number;
  accountId: string;
  isGuestUser?: boolean;
}

export interface ShowErrorNotificationProps {
  errorMessage: string;
  action: string;
  goToDashboard?: boolean;
}

export interface CreateTransferProps {
  valuesExpense: CreateExpenseValues;
  valuesIncome: CreateIncomeValues;
}

export interface UpdateRecordsOnEditProps {
  date: Date;
  recordEdited: AnyRecord;
}

export interface EditExpenseProps {
  values: CreateExpenseValues | CreateIncomeValues;
  recordId: string;
  amountTouched: boolean;
  previousAmount: number;
  accountId: string;
  userId: string;
}

export interface EditIncomeProps {
  values: CreateIncomeValues;
  recordId: string;
  userId: string;
  amountTouched: boolean;
  previousAmount: number;
  previousExpensesRelated: ExpensePaid[];
  accountId: string;
}

export interface UpdateTotalCurrencyProps {
  currentTotal: string;
  newAmount: number;
  recordAgeCategory: RecordAgeCategory;
  editRecord?: boolean;
  previousAmount?: number;
}

export interface GetNewRecordsClassifiedByAgeProps {
  newRecord: RecordRedux;
  newRecords: RecordRedux[];
  recordLocalStorage: RecordsLocalStorage;
  recordAgeStatusKey: RecordAgeStatusKey;
}

export interface GetRecordAgeStatusResponse {
  recordAgeStatusKey: RecordAgeStatusKey;
  missingStatus: RecordAgeStatusKey[];
}

export interface TransferRecordInfo {
  transferId: string;
  account: string;
}

export interface UpdateExpensesPaidLocalProps {
  expensesPaid: ExpensePaidRedux[];
  records: RecordRedux[];
  recordLocalStorage: RecordsLocalStorage;
  recordAgeStatusKey: keyof RecordAgeStatus;
  missingStatus: (keyof RecordAgeStatus)[];
  paidStatus: boolean;
}
