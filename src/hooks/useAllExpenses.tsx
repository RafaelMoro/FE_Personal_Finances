import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders, AxiosError } from 'axios';

import { selectedAccountAtom, userAtom } from '../atoms';
import { ExpensePaid } from '../components/UI/Records/interface';
import { GetRequest } from '../utils';
import { GET_EXPENSES } from '../components/UI/Records/constants';

const useAllExpenses = () => {
  const [user] = useAtom(userAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const selectedAccountId = selectedAccount?._id;
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [noExpensesFound, setNoExpensesFound] = useState<boolean>(false);
  const [error, setError] = useState<string>('No error found');
  const [loading, setLoading] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<ExpensePaid []>([]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const fullRoute = `${GET_EXPENSES}/${selectedAccountId}`;
        const expensesFetched = await GetRequest(fullRoute, bearerToken);

        if (Array.isArray(expensesFetched)) {
          // response returned the array of expenses
          const expensesShorted = expensesFetched.map((expense) => {
            const {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              _id, shortName, amount, fullDate, formattedTime, date,
            } = expense;
            const shortExpense: ExpensePaid = {
              _id, shortName, amount, fullDate, formattedTime, date,
            };
            return shortExpense;
          });
          setExpenses(expensesShorted);
          setLoading(false);
          return;
        }

        // The response returned = No expense found with that account id
        setNoExpensesFound(true);
        setLoading(false);
      } catch (errorCatched) {
        // catch error
        const newError = errorCatched as AxiosError;
        setError(newError.message);
        setLoading(false);
      }
    };
    if (!!user && bearerToken) getExpenses();
  }, [bearerToken, selectedAccountId, user]);

  return {
    expenses,
    noExpensesFound,
    error,
    loading,
  };
};

export { useAllExpenses };
