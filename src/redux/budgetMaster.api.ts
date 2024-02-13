import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_ENV_URI, BACKEND_LOCAL_URI, POST_METHOD } from '../constants';
import { LOGIN_POST_ROUTE } from '../pages/LoginModule/Login/constants';

const BACKEND_URI = BACKEND_ENV_URI ?? BACKEND_LOCAL_URI;

export const budgetMasterApi = createApi({
  reducerPath: 'budgetMasterApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URI }),
  tagTypes: ['BudgetMaster'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ values }) => ({
        url: LOGIN_POST_ROUTE,
        method: POST_METHOD,
        body: values,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = budgetMasterApi;
