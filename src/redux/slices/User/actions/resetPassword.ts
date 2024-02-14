import { POST_METHOD } from '../../../../constants';
import { budgetMasterApi } from '../../../budgetMaster.api';

export const resetPasswordApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: ({ values, route }) => ({
        url: route,
        method: POST_METHOD,
        body: values,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordApiSlice;
