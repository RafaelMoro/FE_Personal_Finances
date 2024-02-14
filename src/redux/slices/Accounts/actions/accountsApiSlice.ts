import { GET_ACCOUNTS_ROUTE } from '../../../../components/UI/Account/features/ViewAccounts/constants';
import { formatAccounts } from '../../../../utils';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { FetchAccountsResponse } from '../interface';

export const accountsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAccounts: builder.query({
      query: (bearerToken: string) => ({
        url: GET_ACCOUNTS_ROUTE,
        headers: {
          Authorization: bearerToken,
        },
      }),
      transformResponse: (response: FetchAccountsResponse) => {
        const accountsFetched = response?.data?.accounts;
        const transformedAccounts = formatAccounts({ accounts: accountsFetched });
        const [firstAccount] = transformedAccounts;
        const newState = {
          accounts: transformedAccounts,
          accountSelected: firstAccount,
        };
        return newState;
      },
    }),
  }),
});

export const { useFetchAccountsQuery } = accountsApiSlice;
