/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CategoriesInitialState } from './interface';
import { CATEGORIES_RECORDS } from '../../../constants';
import { Category } from '../../../globalInterface';

const categoriesInitialState: CategoriesInitialState = {
  categories: null,
  currentCategory: null,
  categoryNotSelected: true,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesInitialState,
  reducers: {
    setAllCategories: (state, action) => {
      const allCategories: Category[] = [...CATEGORIES_RECORDS, ...action.payload];
      const uniqueCategories = allCategories.filter((category) => CATEGORIES_RECORDS.indexOf(category) === -1);
      state.categories = uniqueCategories;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    isCategorySelected: (state) => {
      state.categoryNotSelected = false;
    },
  },
});

export const { updateCurrentCategory, isCategorySelected, setAllCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
