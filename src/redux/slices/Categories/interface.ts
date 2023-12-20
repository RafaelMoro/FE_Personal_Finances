import { AxiosRequestHeaders } from 'axios';
import { Category } from '../../../globalInterface';
import { CategoriesResponse } from '../../../components/UI/Records/interface';

export interface CategoriesInitialState {
  categories: Category[] | null,
  currentCategory: Category | null;
  categoryNotSelected: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
}

export interface FetchCategoriesThunkProps {
  bearerToken: AxiosRequestHeaders;
  categoryToBeEdited: Category | null;
}

export interface FetchCategoriesThunkResponse {
  response: CategoriesResponse;
  categoryToBeEdited: Category | null;
}
