import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { HttpMethods } from '../../aliasType';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function HttpRequestWithBearerToken(
  requestValues: object,
  route: string,
  method: HttpMethods,
  authConfigObject: AxiosRequestHeaders,
) {
  try {
    const configObject = {
      baseURL: BACKEND_URI,
      method,
      url: route,
      headers: authConfigObject,
      data: requestValues,
    };
    const instance = axios.create();
    const response = await instance.request(configObject);
    const data = await response.data;
    return data;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
}