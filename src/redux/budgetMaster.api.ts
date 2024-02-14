import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_ENV_URI, BACKEND_LOCAL_URI, POST_METHOD } from '../constants';
import { LOGIN_POST_ROUTE } from '../pages/LoginModule/Login/constants';
import { LoginResponse } from './slices/User/interface';
import { User } from '../globalInterface';
import { ACCOUNT_TAG } from './constants';

const BACKEND_URI = BACKEND_ENV_URI ?? BACKEND_LOCAL_URI;

export const budgetMasterApi = createApi({
  reducerPath: 'budgetMasterApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URI }),
  tagTypes: [ACCOUNT_TAG],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ values }) => ({
        url: LOGIN_POST_ROUTE,
        method: POST_METHOD,
        body: values,
      }),
      transformResponse: (response: LoginResponse) => {
        const { data } = response;
        const {
          accessToken, user: {
            email, firstName, lastName, middleName,
          },
        } = data;
        const bearerToken = `Bearer ${accessToken}`;
        const user: User = {
          bearerToken,
          accessToken,
          user: {
            email, firstName, lastName, middleName,
          },
        };
        return user;
      },
    }),
  }),
});

export const {
  useLoginMutation,
} = budgetMasterApi;
