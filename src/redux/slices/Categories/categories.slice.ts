/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CATEGORIES_RECORDS } from '../../../constants';
import { CategoriesInitialState } from './interface';
import { fetchCategoriesFulfilled, fetchCategoriesPending, fetchCategoriesRejected } from './actions/fetchCategories';

const categoriesInitialState: CategoriesInitialState = {
  categories: CATEGORIES_RECORDS,
  currentCategory: CATEGORIES_RECORDS[0],
  categoryNotSelected: true,
  loading: false,
  error: false,
  errorMessage: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesInitialState,
  reducers: {
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    isCategorySelected: (state) => {
      state.categoryNotSelected = false;
    },
  },
  extraReducers: (builder) => {
    fetchCategoriesFulfilled(builder);
    fetchCategoriesPending(builder);
    fetchCategoriesRejected(builder);
  },
});

export const { updateCurrentCategory, isCategorySelected } = categoriesSlice.actions;

export default categoriesSlice.reducer;
