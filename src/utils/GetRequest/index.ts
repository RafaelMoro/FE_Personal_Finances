import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const GetRequest = async (route: string, authConfigObject: AxiosRequestHeaders) => {
  try {
    const configObject = {
      baseURL: BACKEND_URI,
      url: route,
      headers: authConfigObject,
    };
    const instance = axios.create();
    const response = await instance.request(configObject);
    const data = await response.data;
    return data;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
};
