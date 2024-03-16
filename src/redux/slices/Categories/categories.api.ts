import { GET_CATEGORIES } from '../../../components/UI/Records/constants';
import { CategoriesResponse } from '../../../components/UI/Records/interface';
import { RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { CATEGORIES_TAG } from '../../constants';

export const categoriesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: ({ bearerToken }: RequestBearerTokenProps) => ({
        url: GET_CATEGORIES,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [CATEGORIES_TAG],
      transformResponse: (response: CategoriesResponse) => response.data?.categories,
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoriesApiSlice;
