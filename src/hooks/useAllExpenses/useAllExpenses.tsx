import { useMemo } from 'react';
import { GET_EXPENSES } from '../../components/UI/Records/constants';
import { UseAllExpensesProps } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { useGetExpensesQuery } from '../../redux/slices/Records/actions/expenses.api';
import { Expense } from '../../globalInterface';

const useAllExpenses = ({ month, year, accountId }: UseAllExpensesProps) => {
  const userReduxState = useAppSelector((state) => state.user);
  const isGuestUser: boolean = userReduxState?.userInfo?.user?.firstName === 'Guest';
  const recordsLocalStorage = useAppSelector((state) => state.records.recordsLocalStorage);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const selectedAccountId = accountId ?? selectedAccount?._id;
  const fullRoute = `${GET_EXPENSES}/${selectedAccountId}/${month}/${year}`;

  const { isFetching, isError, currentData } = useGetExpensesQuery(
    { route: fullRoute, bearerToken },
    { skip: (!bearerToken || !selectedAccountId || isGuestUser) },
  );
  const onlyExpensesIncomes = useMemo(
    () => (currentData?.records ?? []).filter((record) => record.typeOfRecord === 'expense'),
    [currentData?.records],
  );
  const onlyIncomesExpensesLocal = useMemo(() => {
    const recordsLocalStorageSelectedAccount = recordsLocalStorage?.find((record) => record.account === selectedAccountId);
    // Change current month depending on the month selected
    const recordsFormatted: Expense[] = (recordsLocalStorageSelectedAccount?.records?.currentMonth ?? [])
      .filter((record) => record.typeOfRecord === 'expense')
      .map((record) => {
        if (record.isPaid === undefined) {
          const recordFormatted: Expense = { ...record, date: new Date(record.date), isPaid: false };
          return recordFormatted;
        }
        const newRecord: Expense = { ...record, date: new Date(record.date), isPaid: record.isPaid };
        return newRecord;
      });
    return recordsFormatted;
  }, [recordsLocalStorage, selectedAccountId]);

  const recordsToShow = isGuestUser ? onlyIncomesExpensesLocal : onlyExpensesIncomes;

  return {
    expenses: recordsToShow,
    noExpensesFound: currentData?.message === 'No expenses found.',
    isError,
    loading: isFetching,
  };
};

export { useAllExpenses };
