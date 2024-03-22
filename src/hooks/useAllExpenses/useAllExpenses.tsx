import { GET_EXPENSES } from '../../components/UI/Records/constants';
import { UseAllExpensesProps } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { useGetExpensesQuery } from '../../redux/slices/Records/actions/expenses.api';

const useAllExpenses = ({ month, year, accountId }: UseAllExpensesProps) => {
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const selectedAccountId = accountId ?? selectedAccount?._id;
  const fullRoute = `${GET_EXPENSES}/${selectedAccountId}/${month}/${year}`;

  const { isFetching, isError, currentData } = useGetExpensesQuery({ route: fullRoute, bearerToken }, { skip: (!bearerToken || !selectedAccountId) });

  return {
    expenses: currentData?.records ?? [],
    noExpensesFound: currentData?.message === 'No expenses found.',
    isError,
    loading: isFetching,
  };
};

export { useAllExpenses };
