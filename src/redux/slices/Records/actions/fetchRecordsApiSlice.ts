import { IncomeAndExpensesResponse } from '../../../../components/UI/Records/interface';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { GetRecordByMonthAndYearProps } from '../interface';

export const fetchRecordsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchRecordsByMonthYear: builder.query({
      query: ({ route, bearerToken }: GetRecordByMonthAndYearProps) => ({
        url: route,
        headers: {
          Authorization: bearerToken,
        },
      }),
      transformResponse: (response: IncomeAndExpensesResponse) => {
        const { data: { records }, message } = response;
        return { records, message };
      },
    }),
  }),
});

export const { useFetchRecordsByMonthYearQuery, useLazyFetchRecordsByMonthYearQuery } = fetchRecordsApiSlice;
