import { POST_METHOD } from '../../../../constants';
import { CREATE_LOCAL_CATEGORIES_ROUTE, CREATE_USER_POST_ROUTE } from '../../../../pages/LoginModule/CreateAccount/constants';
import { CreateLocalCategoriesProps, CreateUserValuesMutation } from '../../../../pages/LoginModule/CreateAccount/interface';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { CATEGORIES_TAG } from '../../../constants';

export const createUserApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (values: CreateUserValuesMutation) => ({
        url: CREATE_USER_POST_ROUTE,
        method: POST_METHOD,
        body: values,
      }),
    }),
    createLocalCategories: builder.mutation({
      query: (values: CreateLocalCategoriesProps) => ({
        url: CREATE_LOCAL_CATEGORIES_ROUTE,
        method: POST_METHOD,
        body: values,
      }),
      invalidatesTags: [CATEGORIES_TAG],
    }),
  }),
});

export const { useCreateUserMutation, useCreateLocalCategoriesMutation } = createUserApiSlice;
