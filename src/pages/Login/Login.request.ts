import axios, { AxiosError } from 'axios';
import { ILoginUserInfo } from './interface';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function loginUserRequest(userInfo: ILoginUserInfo) {
  try {
    const response = await axios.post(`${BACKEND_URI}/auth/`, userInfo);
    const accessToken = await response.data?.accessToken;
    return accessToken;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
}
