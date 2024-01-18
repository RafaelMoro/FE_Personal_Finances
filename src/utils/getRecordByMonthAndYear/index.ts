import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AxiosRequestHeaders } from 'axios';
import { IncomeAndExpensesResponse } from '../../components/UI/Records/interface';
import { GetRequest } from '../GetRequest';

interface GetRecordByMonthAndYearProps {
  recordsFullRoute: string;
  bearerToken: AxiosRequestHeaders;
}

export const getRecordsByMonthAndYear = async (
  { recordsFullRoute, bearerToken }: GetRecordByMonthAndYearProps,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>,
) => {
  const { rejectWithValue } = thunkAPI;
  const response: IncomeAndExpensesResponse = await GetRequest(recordsFullRoute, bearerToken);
  if (response?.error) return rejectWithValue(response);
  return response;
};
