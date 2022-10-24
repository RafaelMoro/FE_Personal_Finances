import axios, { AxiosError } from 'axios';
import { ILoginValues } from './interface';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function loginUserRequest(userInfo: ILoginValues) {
  try {
    const response = await axios.post(`${BACKEND_URI}/auth/`, userInfo);
    const data = await response.data;
    return data;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
}
