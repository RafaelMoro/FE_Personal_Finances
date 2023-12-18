import { AxiosRequestHeaders } from 'axios';
import {
  CreateEditExpenseResponse, CreateExpenseValues, CreateIncomeResponse, CreateIncomeValues, DeleteRecordResponse,
} from '../../../components/UI/Records/interface';
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

export interface CreateIncomeThunkProps extends Omit<CreateExpenseThunkProps, 'values'> {
  values: CreateIncomeValues;
}

export interface DeleteRecordProps {
  recordId: string;
}

export interface DeleteRecordThunkProps extends Omit<CreateExpenseThunkProps, 'values'> {
  values: DeleteRecordProps;
  route: string;
}
export interface CreateIncomeThunkResponse extends Omit<CreateExpenseThunkResponse, 'response'> {
  response: CreateIncomeResponse;
}

export interface DeleteExpenseThunkResponse extends Omit<CreateExpenseThunkResponse, 'response'> {
  response: DeleteRecordResponse;
  values: DeleteRecordProps;
}

export interface EditExpenseValues extends CreateExpenseValues {
  recordId: string;
  userId: string;
}

export interface EditExpenseThunkProps extends Omit<CreateExpenseThunkProps, 'values'> {
  values: EditExpenseValues;
}

export interface EditExpenseThunkResponse extends Omit<CreateExpenseThunkResponse, 'response'> {
  response: CreateEditExpenseResponse;
}
