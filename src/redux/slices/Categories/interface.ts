import { AxiosRequestHeaders } from 'axios';
import { Category } from '../../../globalInterface';

export interface CategoriesInitialState {
  categories: Category[],
  currentCategory: Category;
  categoryNotSelected: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string | unknown;
}

export interface FetchCategoriesThunkProps {
  bearerToken: AxiosRequestHeaders;
}
