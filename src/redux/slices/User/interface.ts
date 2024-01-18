import { GeneralResponse, User } from '../../../globalInterface';

export interface UserInitialState {
  userInfo: null | User;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
  navigateToDashboard: boolean;
}

export interface UserResponseLogin {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface LoginData {
  accessToken: string;
  user: UserResponseLogin;
}

export interface LoginResponse extends Omit<GeneralResponse, 'data'> {
  data: LoginData;
}
