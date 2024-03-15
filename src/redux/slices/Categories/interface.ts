import { Category } from '../../../globalInterface';
import { CategoriesResponse } from '../../../components/UI/Records/interface';

export interface CategoriesInitialState {
  currentCategory: Category | null;
  categoryNotSelected: boolean;
}

export interface FetchCategoriesQueryProps {
  bearerToken: string;
}

export interface FetchCategoriesThunkResponse {
  response: CategoriesResponse;
  categoryToBeEdited: Category | null;
}
