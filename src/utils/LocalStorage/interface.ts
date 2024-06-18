import { Account, AnyRecord, User } from '../../globalInterface';

export interface RecordsLocalStorage {
  account: string;
  records: AnyRecord[];
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
