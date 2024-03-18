import { DELETE_ACCOUNT_ROUTE, POST_PUT_ACCOUNT_ROUTE, GET_ACCOUNTS_ROUTE } from '../../../../components/UI/Account/Account.constants';
import { DELETE_METHOD, POST_METHOD, PUT_METHOD } from '../../../../constants';
import { formatAccounts } from '../../../../utils';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { ACCOUNT_TAG } from '../../../constants';
import {
  CreateAccountMutationProps, DeleteAccountMutationProps, FetchAccountsResponse, ModifyAccountMutationProps, UpdateAmountAccountMutationProps,
} from '../interface';

export const accountsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAccounts: builder.query({
      query: (bearerToken: string) => ({
        url: GET_ACCOUNTS_ROUTE,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [ACCOUNT_TAG],
      transformResponse: (response: FetchAccountsResponse) => {
        const accountsFetched = response?.data?.accounts;
        const transformedAccounts = formatAccounts({ accounts: accountsFetched });
        return transformedAccounts;
      },
    }),

    createAccount: builder.mutation({
      query: ({ values, bearerToken }: CreateAccountMutationProps) => ({
        url: POST_PUT_ACCOUNT_ROUTE,
        method: POST_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [ACCOUNT_TAG],
    }),

    modifyAccount: builder.mutation({
      query: ({ values, bearerToken }: ModifyAccountMutationProps) => ({
        url: POST_PUT_ACCOUNT_ROUTE,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [ACCOUNT_TAG],
    }),

    modifyAmountAccount: builder.mutation({
      query: ({ payload, bearerToken }: UpdateAmountAccountMutationProps) => ({
        url: POST_PUT_ACCOUNT_ROUTE,
        method: PUT_METHOD,
        body: payload,
        headers: {
          Authorization: bearerToken,
        },
      }),
    }),

    deleteAccount: builder.mutation({
      query: ({ values, bearerToken }: DeleteAccountMutationProps) => ({
        url: DELETE_ACCOUNT_ROUTE,
        method: DELETE_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [ACCOUNT_TAG],
    }),
  }),
});

export const {
  useFetchAccountsQuery, useCreateAccountMutation, useDeleteAccountMutation, useModifyAccountMutation,
  useModifyAmountAccountMutation,
} = accountsApiSlice;
