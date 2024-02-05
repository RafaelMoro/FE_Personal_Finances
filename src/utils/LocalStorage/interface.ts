import { AnyRecord, User } from '../../globalInterface';

export interface CountOnMeLocalStorage {
  user: User;
  recordToBeEdited: AnyRecord;
}

export interface JWT {
  exp: number;
  iat: number;
}
