import { User } from '../../../globalInterface';

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

export interface LoginInfoResponse {
  accessToken: string;
  user: UserResponseLogin
  error?: string;
  message?: string;
  statusCode?: number;
}
