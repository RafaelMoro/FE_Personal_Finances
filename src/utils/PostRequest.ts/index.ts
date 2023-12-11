import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

// Not using try catch as async thunk will catch the error and return rejected if needed.
export async function postRequest(requestValues: object, route: string) {
  const response = await axios.post(`${BACKEND_URI}/${route}`, requestValues);
  const data = await response.data;
  return data;
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
    return error;
  }
}
