import axios, { AxiosError } from 'axios';
import { IForgotPasswordValues } from './interface';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function ForgotPasswordRequest(values: IForgotPasswordValues) {
  try {
    const response = await axios.post(`${BACKEND_URI}/users/forgot-password`, values);
    const data = await response.data?.response;
    return data;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
}
