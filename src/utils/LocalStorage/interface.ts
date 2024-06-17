import { Account, AnyRecord, User } from '../../globalInterface';

export interface CountOnMeLocalStorage {
  bearerToken: string
  accessToken: string
  user: User;
  recordToBeEdited: AnyRecord;
  accounts?: Account[];
}

export interface JWT {
  exp: number;
  iat: number;
}
