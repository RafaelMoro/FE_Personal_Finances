import { AxiosRequestHeaders } from 'axios';
import { AllRecords, RecordsTotal } from '../../../globalInterface';

export interface RecordsInitialState {
  allRecords: AllRecords;
  totalRecords: RecordsTotal;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
}

export interface FetchRecordsValues {
  expensesFullRoute: string;
  bearerToken: AxiosRequestHeaders;
}
