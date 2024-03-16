/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CategoriesInitialState } from './interface';

const categoriesInitialState: CategoriesInitialState = {
  currentCategory: null,
  categoryNotSelected: true,
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
});

export const { updateCurrentCategory, isCategorySelected } = categoriesSlice.actions;

export default categoriesSlice.reducer;
