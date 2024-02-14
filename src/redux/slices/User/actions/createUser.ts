import { POST_METHOD } from '../../../../constants';
import { CREATE_USER_POST_ROUTE } from '../../../../pages/LoginModule/CreateAccount/constants';
import { CreateUserValuesMutation } from '../../../../pages/LoginModule/CreateAccount/interface';
import { budgetMasterApi } from '../../../budgetMaster.api';

export const createUserApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (values: CreateUserValuesMutation) => ({
        url: CREATE_USER_POST_ROUTE,
        method: POST_METHOD,
        body: values,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = createUserApiSlice;