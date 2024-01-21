/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesResponse } from '../../../../components/UI/Records/interface';
import { GET_CATEGORIES } from '../../../../components/UI/Records/constants';
import { GetRequest } from '../../../../utils';
import { CategoriesInitialState, FetchCategoriesThunkProps, FetchCategoriesThunkResponse } from '../interface';
import { CATEGORIES_RECORDS } from '../../../../constants';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ bearerToken, categoryToBeEdited }: FetchCategoriesThunkProps) => {
    const categoriesResponse: CategoriesResponse = await GetRequest(GET_CATEGORIES, bearerToken);
    const response: FetchCategoriesThunkResponse = {
      response: categoriesResponse,
      categoryToBeEdited,
    };
    return response;
  },
);

export const fetchCategoriesFulfilled = (
  builder: ActionReducerMapBuilder<CategoriesInitialState>,
) => builder.addCase(fetchCategories.fulfilled, (state, action) => {
  state.loading = false;
  const { categoryToBeEdited } = action.payload;
  const categoriesFetched = action.payload.response.data.categories;

  // Filter the categories unique from the categories fetched and the local categories
  const allCategories = [...CATEGORIES_RECORDS, ...categoriesFetched];
  const localCategoriesNames = CATEGORIES_RECORDS.map((category) => category.categoryName);
  const notRepeatedFetchedCategories = allCategories.filter((category) => localCategoriesNames.indexOf(category.categoryName) === -1);
  const uniqueCategories = [...CATEGORIES_RECORDS, ...notRepeatedFetchedCategories];
  state.categories = uniqueCategories;

  if (categoryToBeEdited) {
    state.currentCategory = categoryToBeEdited;
    state.categoryNotSelected = false;
  }
});

export const fetchCategoriesPending = (
  builder: ActionReducerMapBuilder<CategoriesInitialState>,
) => builder.addCase(fetchCategories.pending, (state) => {
  state.loading = true;

  // Reset previous error status if it occurred
  state.error = false;
  state.errorMessage = '';
});

export const fetchCategoriesRejected = (
  builder: ActionReducerMapBuilder<CategoriesInitialState>,
) => builder.addCase(fetchCategories.rejected, (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage = action.error.message;
});
