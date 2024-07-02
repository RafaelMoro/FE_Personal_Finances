import { useEffect, useMemo, useState } from 'react';
import { GET_EXPENSES } from '../../components/UI/Records/constants';
import { UseAllExpensesProps } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { useGetExpensesQuery } from '../../redux/slices/Records/actions/expenses.api';
import { Expense } from '../../globalInterface';
import { useDate } from '../useDate';
import { getLocalRecords } from './utils';

const useAllExpenses = ({ month, year, accountId }: UseAllExpensesProps) => {
  const { month: currentMonth, lastMonth } = useDate();
  const userReduxState = useAppSelector((state) => state.user);
  const isGuestUser: boolean = userReduxState?.userInfo?.user?.firstName === 'Guest';
  const recordsLocalStorage = useAppSelector((state) => state.records.recordsLocalStorage);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const selectedAccountId = accountId ?? selectedAccount?._id;
  const fullRoute = `${GET_EXPENSES}/${selectedAccountId}/${month}/${year}`;
  const recordsLocalStorageSelectedAccount = recordsLocalStorage?.find((record) => record.account === selectedAccountId);

  const [localRecords, setLocalRecords] = useState<Expense[]>([]);
  const [noExpensesFound, setNoExpensesFound] = useState<boolean>(false);

  const turnOnNoExpensesFound = () => setNoExpensesFound(true);
  const turnOffNoExpensesFound = () => setNoExpensesFound(false);

  useEffect(() => {
    if (isGuestUser && recordsLocalStorage) {
      const fetchedLocalRecords = getLocalRecords({
        month,
        lastMonth,
        currentMonth,
        year,
        recordsLocalStorageSelectedAccount,
        turnOnNoExpensesFound,
        turnOffNoExpensesFound,
        noExpensesFound,
      });
      setLocalRecords(fetchedLocalRecords);
    }
  }, [currentMonth, isGuestUser, lastMonth, month, noExpensesFound, recordsLocalStorage, recordsLocalStorageSelectedAccount, year]);

  const { isFetching, isError, currentData } = useGetExpensesQuery(
    { route: fullRoute, bearerToken },
    { skip: (!bearerToken || !selectedAccountId || isGuestUser) },
  );

  useEffect(() => {
    if (currentData?.message === 'No expenses found.') {
      turnOnNoExpensesFound();
    }
    if (!currentData?.message) {
      turnOffNoExpensesFound();
    }
  }, [currentData]);

  const onlyExpensesIncomes = useMemo(
    () => (currentData?.records ?? []).filter((record) => record.typeOfRecord === 'expense'),
    [currentData?.records],
  );

  const recordsToShow = isGuestUser ? localRecords : onlyExpensesIncomes;

  return {
    expenses: recordsToShow,
    noExpensesFound,
    isError,
    loading: isFetching,
  };
};

export { useAllExpenses };
