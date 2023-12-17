import { AxiosRequestHeaders } from 'axios';
import { CreateEditExpenseResponse, CreateExpenseValues } from '../../../components/UI/Records/interface';
import { AllRecords, RecordsTotal } from '../../../globalInterface';

export interface RecordsInitialState {
  allRecords: AllRecords;
  totalRecords: RecordsTotal;
  loading: boolean;
  loadingOnAction: boolean;
  errorOnAction: boolean;
  error: boolean;
  errorMessage: string | unknown;
  errorMessageOnAction: string | unknown;
}

export interface CreateExpenseThunkProps {
  values: CreateExpenseValues;
  bearerToken: AxiosRequestHeaders;
  isLastMonth?: boolean;
  isCurrentMonth?: boolean;

}

export interface CreateExpenseThunkResponse {
  response: CreateEditExpenseResponse;
  isLastMonth?: boolean;
  isCurrentMonth?: boolean;
}
