import { AnyRecord, User } from '../../globalInterface';

export interface CountOnMeLocalStorage {
  bearerToken: string
  accessToken: string
  user: User;
  recordToBeEdited: AnyRecord;
}

export interface JWT {
  exp: number;
  iat: number;
}
