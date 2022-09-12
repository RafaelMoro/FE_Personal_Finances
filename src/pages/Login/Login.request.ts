/* eslint-disable no-console */
import axios from 'axios';
import { ILoginUserInfo } from './interface';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function loginUserRequest(userInfo: ILoginUserInfo) {
  try {
    const response = await axios.post(`${BACKEND_URI}/auth/`, userInfo);
    console.log(response);
  } catch (error) {
    console.error('login post request error', error);
  }
}
