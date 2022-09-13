/* eslint-disable no-console */
import axios from 'axios';

import { ILoginUserInfo } from './interface';
import { getLocalStorageInfo } from '../../utils/getInfoLocalStorage';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function loginUserRequest(userInfo: ILoginUserInfo) {
  try {
    const response = await axios.post(`${BACKEND_URI}/auth/`, userInfo);
    const accessToken = response.data?.accessToken;
    // Working on this part.
    console.log(accessToken);
    getLocalStorageInfo();
  } catch (error) {
    console.error('login post request error', error);
  }
}
