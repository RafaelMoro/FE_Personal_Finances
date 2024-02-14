import { GeneralResponse, OldUser } from '../../../globalInterface';
import { ResetPasswordValues } from '../../../pages/LoginModule/ResetPassword/interface';

export interface UserInitialState {
  // @TODO Delete OldUser and Add User
  userInfo: null | OldUser;
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
