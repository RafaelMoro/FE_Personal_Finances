import { GET_CATEGORIES } from '../../../components/UI/Records/constants';
import { CategoriesResponse } from '../../../components/UI/Records/interface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { FetchCategoriesQueryProps } from './interface';

export const categoriesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: ({ bearerToken }: FetchCategoriesQueryProps) => ({
        url: GET_CATEGORIES,
        headers: {
          Authorization: bearerToken,
        },
      }),
      transformResponse: (response: CategoriesResponse) => response.data?.categories,
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoriesApiSlice;
