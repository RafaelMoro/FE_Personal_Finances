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
    }),
  }),
});

export const { useFetchRecordsByMonthYearQuery } = fetchRecordsApiSlice;
