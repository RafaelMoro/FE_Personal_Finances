import { POST_METHOD } from '../../../../constants';
import { FORGOT_PASSWORD_POST_ROUTE } from '../../../../pages/LoginModule/ForgotPassword/constants';
import { budgetMasterApi } from '../../../budgetMaster.api';

export const forgotPasswordApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: ({ values }) => ({
        url: FORGOT_PASSWORD_POST_ROUTE,
        method: POST_METHOD,
        body: values,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApiSlice;
