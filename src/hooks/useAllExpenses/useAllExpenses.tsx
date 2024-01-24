import { useEffect, useState } from 'react';
import { AxiosRequestHeaders, AxiosError } from 'axios';

import { GetRequest } from '../../utils';
import { GET_EXPENSES } from '../../components/UI/Records/constants';
import { UseAllExpensesProps, GetExpensesNotPaidResponse } from './interface';
import { ExpensePaid } from '../../globalInterface';
import { useAppSelector } from '../../redux/hooks';

const useAllExpenses = ({ month, year }: UseAllExpensesProps) => {
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as AxiosRequestHeaders;
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const selectedAccountId = selectedAccount?._id;

  const [noExpensesFound, setNoExpensesFound] = useState<boolean>(false);
  const [error, setError] = useState<string>('No error found');
  const [loading, setLoading] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<ExpensePaid []>([]);

  /** Note: Not using redux as I need the expenses in react state rather than redux state (not globally). */
  useEffect(() => {
    const getExpenses = async () => {
      try {
        // set loading to true if it was false.
        setLoading(true);
        const fullRoute = `${GET_EXPENSES}/${selectedAccountId}/${month}/${year}`;
        const response: GetExpensesNotPaidResponse = await GetRequest(fullRoute, bearerToken);

        if (response.data?.records) {
          // set it as false if it was previously true.
          setNoExpensesFound(false);
          setExpenses(response.data?.records);
          setLoading(false);
          return;
        }

        // The response returned = No expense found with that account id
        setNoExpensesFound(true);
        setExpenses([]);
        setLoading(false);
      } catch (errorCatched) {
        // catch error
        const newError = errorCatched as AxiosError;
        setError(newError.message);
        setLoading(false);
      }
    };
    if (!!userReduxState && bearerToken) getExpenses();
  }, [bearerToken, month, selectedAccountId, userReduxState, year]);

  return {
    expenses,
    noExpensesFound,
    error,
    loading,
  };
};

export { useAllExpenses };
