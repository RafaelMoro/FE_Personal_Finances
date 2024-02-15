import { IncomeAndExpensesResponse } from '../../../../components/UI/Records/interface';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { GetRecordByMonthAndYearProps } from '../interface';

export const recordsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchRecordsByMonthYear: builder.query({
      query: ({ route, bearerToken }: GetRecordByMonthAndYearProps) => ({
        url: route,
        headers: {
          Authorization: bearerToken,
        },
      }),
      transformResponse: (response: IncomeAndExpensesResponse) => {
        const { data, message } = response;
        // records could be null, setting an empty array if it's null
        const records = data?.records ?? [];
        return { records, message };
      },
    }),
  }),
});

export const { useFetchRecordsByMonthYearQuery, useLazyFetchRecordsByMonthYearQuery } = recordsApiSlice;
