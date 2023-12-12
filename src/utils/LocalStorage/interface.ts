import { User } from '../../globalInterface';

export interface CountOnMeLocalStorage {
  user: User;
}

export interface JWT {
  exp: number;
  iat: number;
}
