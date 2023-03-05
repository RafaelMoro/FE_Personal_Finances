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

export async function postRequestWithBearerToken(
  requestValues: object,
  route: string,
  authConfigObject: AxiosRequestHeaders,
) {
  try {
    const configObject = {
      baseURL: BACKEND_URI,
      method: 'post',
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
