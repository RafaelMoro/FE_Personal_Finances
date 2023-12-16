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
