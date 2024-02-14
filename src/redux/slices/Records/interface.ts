import { AxiosRequestHeaders } from 'axios';
import {
  RecordOperationResponse, CreateExpenseValues, CreateIncomeValues, DeleteRecordResponse,
} from '../../../components/UI/Records/interface';
import {
  AllRecords, AnyRecord, Expense, RecordsTotal,
} from '../../../globalInterface';
import { RecordAgeCategory } from '../../../aliasType';

export interface RecordsInitialState {
  allRecords: AllRecords;
  totalRecords: RecordsTotal;
  recordToBeModified: AnyRecord | null;
  loading: boolean;
  loadingOnAction: boolean;
  errorOnAction: boolean;
  error: boolean;
  errorMessage: string | unknown;
  errorMessageOnAction: string | unknown;
}

export interface GetRecordByMonthAndYearProps {
  route: string;
  bearerToken: string;
}

export interface UpdateTotalExpenseIncomePayload {
  newAmount: string;
  recordAgeCategory: RecordAgeCategory;
}

export interface UpdateTotalExpenseIncomeAction {
  payload: UpdateTotalExpenseIncomePayload;
  type: string;
}

export interface CreateExpenseThunkProps {
  values: CreateExpenseValues;
  bearerToken: AxiosRequestHeaders;
  isLastMonth?: boolean;
  isCurrentMonth?: boolean;
}

export interface RecordOperationThunkResponse {
  response: RecordOperationResponse;
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

export interface DeleteExpenseThunkResponse extends Omit<RecordOperationThunkResponse, 'response'> {
  response: DeleteRecordResponse;
  values: DeleteRecordProps;
}

export interface EditExpenseValues extends CreateExpenseValues {
  recordId: string;
  userId: string;
}

export interface EditIncomeValues extends CreateIncomeValues {
  recordId: string;
  userId: string;
}

export interface EditExpenseThunkProps extends Omit<CreateExpenseThunkProps, 'values'> {
  values: EditExpenseValues;
}

export interface EditIncomeThunkProps extends Omit<CreateExpenseThunkProps, 'values'> {
  values: EditIncomeValues;
}

export interface UpdateRelatedExpenses extends Omit<CreateExpenseThunkProps, 'values'> {
  payload: UpdateRelatedExpensesValues[];
}

export interface EditIncomeThunkResponse extends Omit<RecordOperationThunkResponse, 'response'> {
  response: RecordOperationResponse;
}

export interface UpdateRelatedExpensesValues {
  recordId: string;
  isPaid: boolean;
}

export interface UpdatedRelatedExpensesResponse {
  response: Expense[];
  isLastMonth?: boolean;
  isCurrentMonth?: boolean;
}
