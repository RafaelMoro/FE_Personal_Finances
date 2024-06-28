import { Category } from '../../../globalInterface';
import { CategoriesResponse } from '../../../components/UI/Records/interface';

export interface CategoriesInitialState {
  currentCategory: Category | null;
  categoryNotSelected: boolean;
  categoriesLocalStorage: Category[];
}

export interface FetchCategoriesThunkResponse {
  response: CategoriesResponse;
  categoryToBeEdited: Category | null;
}
