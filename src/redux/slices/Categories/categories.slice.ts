/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CategoriesInitialState } from './interface';
import { CATEGORIES_RECORDS } from '../../../constants';

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
      const allCategories = [...CATEGORIES_RECORDS, ...action.payload];
      const categoriesSet = new Set(allCategories);
      const uniqueCategories = [...categoriesSet];
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
