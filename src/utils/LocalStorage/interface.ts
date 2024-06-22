import {
  Account, AnyRecord, RecordRedux, User,
} from '../../globalInterface';

export interface RecordsLocalStorage {
  account: string;
  records: {
    currentMonth: RecordRedux[];
    lastMonth: RecordRedux[];
    olderRecords: RecordRedux[];
  };
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
