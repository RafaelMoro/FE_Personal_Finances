import { AxiosRequestHeaders } from 'axios';
import { IncomeAndExpensesResponse } from '../../components/UI/Records/interface';
import { GetRequest } from '../GetRequest';

interface GetRecordByMonthAndYearProps {
  expensesFullRoute: string;
  bearerToken: AxiosRequestHeaders;
}

export const getRecordsByMonthAndYear = async ({
  expensesFullRoute, bearerToken,
}: GetRecordByMonthAndYearProps) => {
  const response: IncomeAndExpensesResponse = await GetRequest(expensesFullRoute, bearerToken);
  return response;
};
