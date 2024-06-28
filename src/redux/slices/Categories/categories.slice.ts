/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CategoriesInitialState } from './interface';
import { CATEGORIES_RECORDS } from '../../../constants';

const categoriesInitialState: CategoriesInitialState = {
  currentCategory: null,
  categoryNotSelected: true,
  categoriesLocalStorage: CATEGORIES_RECORDS,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesInitialState,
  reducers: {
    resetCategoriesLocalStorage: (state) => {
      state.categoriesLocalStorage = [];
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    isCategoryNotSelected: (state) => {
      state.categoryNotSelected = true;
    },
    isCategorySelected: (state) => {
      state.categoryNotSelected = false;
    },
  },
});

export const {
  updateCurrentCategory, isCategorySelected, isCategoryNotSelected, resetCategoriesLocalStorage,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
