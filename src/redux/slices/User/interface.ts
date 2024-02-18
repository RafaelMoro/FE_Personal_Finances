import { GeneralResponse, User } from '../../../globalInterface';
import { ResetPasswordValues } from '../../../pages/LoginModule/ResetPassword/interface';

export interface UserInitialState {
  userInfo: null | User;
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

export interface ResetPasswordThunkProps {
  values: ResetPasswordValues;
  route: string
}
