import { EXPENSE_ROUTE } from '../../../../components/UI/Records/constants';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { CreateExpenseMutationProps } from '../interface';

export const expensesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: ({ values, bearerToken }: CreateExpenseMutationProps) => ({
        url: EXPENSE_ROUTE,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
    }),
  }),
});

export const { useCreateExpenseMutation } = expensesApiSlice;
