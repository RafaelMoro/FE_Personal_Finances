import { GET_CATEGORIES } from '../../../components/UI/Records/constants';
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response.data?.categories,
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoriesApiSlice;
