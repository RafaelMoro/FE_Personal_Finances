import {
  Account, AnyRecord, RecordRedux, User,
} from '../../globalInterface';

export interface RecordsLocalStorage {
  account: string;
  records: RecordRedux[];
}

export interface RecordsLocalStorageRedux {
  account: string;
  records: RecordRedux[];
}

export interface CountOnMeLocalStorage {
  bearerToken: string
  accessToken: string
  user: User;
  recordToBeEdited: AnyRecord;
  accounts?: Account[];
  records?: RecordsLocalStorageRedux[];
}

export interface JWT {
  exp: number;
  iat: number;
}
