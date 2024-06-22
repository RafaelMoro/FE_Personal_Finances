import {
  Account, AnyRecord, RecordRedux, User,
} from '../../globalInterface';

export interface RecordAgeStatus {
  currentMonth: RecordRedux[];
  lastMonth: RecordRedux[];
  olderRecords: RecordRedux[];
}

export type RecordAgeStatusKey = keyof RecordAgeStatus;

export interface RecordsLocalStorage {
  account: string;
  records: RecordAgeStatus;
}

export interface BudgetMasterLocalStorage {
  bearerToken: string
  accessToken: string
  user: User;
  recordToBeEdited: AnyRecord;
  accounts?: Account[];
  records?: RecordsLocalStorage[];
}

export interface JWT {
  exp: number;
  iat: number;
}
