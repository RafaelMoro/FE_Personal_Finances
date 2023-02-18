import { AxiosRequestHeaders } from 'axios';

export interface IUser {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
}
