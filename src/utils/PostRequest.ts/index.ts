import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export async function postRequest(requestValues: object, route: string) {
  try {
    const response = await axios.post(`${BACKEND_URI}/${route}`, requestValues);
    const data = await response.data;
    return data;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
}

export async function postRequestWithBearer(requestValues: object, route: string, authConfigObject: AxiosRequestHeaders) {
  try {
    const configObject = {
      headers: authConfigObject,
    };
    const response = await axios.post(`${BACKEND_URI}/${route}`, requestValues, configObject);
    const data = await response.data;
    return data;
  } catch (errorCatched) {
    const error = errorCatched as AxiosError;
    return error.response?.data;
  }
}
