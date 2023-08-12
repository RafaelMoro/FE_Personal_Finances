import { AxiosError, AxiosRequestHeaders } from 'axios';
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND } from '../../components/UI/Records/constants';
import { NETWORK_CATCH_ERROR } from '../../constants';
import { IncomeAndExpensesResponse } from '../../components/UI/Records/interface';
import { GetRequest } from '../GetRequest';
import { AnyRecord } from '../../globalInterface';

interface GetRecordByMonthAndYearProps {
  accountId: string;
  month: string;
  year: string;
  bearerToken: AxiosRequestHeaders;
  handleErrorCallback: (error: string) => void;
  handleFetchRecordsCallback: (records: AnyRecord[]) => void;
}

export const getRecordsByMonthAndYear = async ({
  accountId, month, year, bearerToken, handleErrorCallback, handleFetchRecordsCallback,
}: GetRecordByMonthAndYearProps) => {
  try {
    const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
    const response: IncomeAndExpensesResponse = await GetRequest(expensesFullRoute, bearerToken);

    if (response?.error) {
      // handle error
      const errorMessage = response?.message as string;
      if (errorMessage === NETWORK_CATCH_ERROR) {
        const error = 'Error #401';
        handleErrorCallback(error);
        return;
      }
      const error = errorMessage;
      handleErrorCallback(error);
      return;
    }

    if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
      // Show that there are no records and the user may create one.
      return;
    }

    const recordFetched = response?.records;
    handleFetchRecordsCallback(recordFetched);
  } catch (errorCatched) {
    const newError = errorCatched as AxiosError;
    const error = newError.message;
    handleErrorCallback(error);
  }
};
