import { GET_CATEGORIES } from '../../../components/UI/Records/constants';
import { CategoriesResponse } from '../../../components/UI/Records/interface';
import { RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';

export const categoriesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: ({ bearerToken }: RequestBearerTokenProps) => ({
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
