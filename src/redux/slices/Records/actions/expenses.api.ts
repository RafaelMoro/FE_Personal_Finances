import { EXPENSE_ROUTE, UPDATE_MULTIPLE_EXPENSES } from '../../../../components/UI/Records/constants';
import { POST_METHOD, PUT_METHOD } from '../../../../constants';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { RECORD_TAG } from '../../../constants';
import { CreateExpenseMutationProps } from '../interface';

export const expensesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: ({ values, bearerToken }: CreateExpenseMutationProps) => ({
        url: EXPENSE_ROUTE,
        method: POST_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG],
    }),

    editExpense: builder.mutation({
      query: ({ values, bearerToken }) => ({
        url: EXPENSE_ROUTE,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG],
    }),

    updatePaidMultipleExpenses: builder.mutation({
      query: ({ values, bearerToken }) => ({
        url: UPDATE_MULTIPLE_EXPENSES,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
    }),
  }),
});

export const { useCreateExpenseMutation, useEditExpenseMutation, useUpdatePaidMultipleExpensesMutation } = expensesApiSlice;
