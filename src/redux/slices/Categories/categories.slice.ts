import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../globalInterface';
import { CATEGORIES_RECORDS } from '../../../constants';

interface CategoriesInitialState {
  categories: Category[],
  currentCategory: Category | null;
  categoryNotSelected: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const categoriesInitialState: CategoriesInitialState = {
  categories: CATEGORIES_RECORDS,
  currentCategory: null,
  categoryNotSelected: false,
  loading: false,
  error: false,
  errorMessage: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesInitialState,
  reducers: {},
});

export default categoriesSlice.reducer;
