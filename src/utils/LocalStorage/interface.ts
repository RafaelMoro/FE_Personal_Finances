import { User } from '../../globalInterface';

export interface ICountOnMeLocalStorage {
  user: User;
}

export interface JWT {
  exp: number;
  iat: number;
}
