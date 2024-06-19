import {
  Account, AnyRecord, RecordRedux, User,
} from '../../globalInterface';

export interface RecordsLocalStorage {
  account: string;
  records: RecordRedux[];
}

export interface CountOnMeLocalStorage {
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
