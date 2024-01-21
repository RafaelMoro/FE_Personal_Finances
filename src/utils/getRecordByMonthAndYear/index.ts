import { AxiosRequestHeaders } from 'axios';
import { IncomeAndExpensesResponse } from '../../components/UI/Records/interface';
import { GetRequest } from '../GetRequest';

interface GetRecordByMonthAndYearProps {
  recordsFullRoute: string;
  bearerToken: AxiosRequestHeaders;
}

export const getRecordsByMonthAndYear = async (
  { recordsFullRoute, bearerToken }: GetRecordByMonthAndYearProps,
) => {
  const response: IncomeAndExpensesResponse = await GetRequest(recordsFullRoute, bearerToken);
  return response;
};
