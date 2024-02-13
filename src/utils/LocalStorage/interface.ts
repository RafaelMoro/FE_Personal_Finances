import { AnyRecord, OldUser } from '../../globalInterface';

export interface CountOnMeLocalStorage {
  user: OldUser;
  recordToBeEdited: AnyRecord;
}

export interface JWT {
  exp: number;
  iat: number;
}
