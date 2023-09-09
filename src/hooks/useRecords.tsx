/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { postRequestWithBearer } from '../utils';
import { POST_EXPENSE_ROUTE, POST_INCOME_ROUTE } from '../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../pages/RoutesConstants';
import {
  CreateExpenseResponse, CreateExpenseValues, CreateIncomeValues, CreateIncomeResponse,
} from '../components/UI/Records/interface';
import { allRecordsAtom, userAtom } from '../atoms';

const useRecords = () => {
  const navigate = useNavigate();
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const currentMonthRecords = allRecords?.currentMonth;

  const handleSubmitExpense = async (values: CreateExpenseValues) => {
    const createExpenseInfo: CreateExpenseResponse = await postRequestWithBearer(values, POST_EXPENSE_ROUTE, bearerToken);

    // If an error is catched:
    if (createExpenseInfo?.message) {
      // Show notification error

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
      return;
    }

    // Update expenses
    const recordsUpdated = [...currentMonthRecords, createExpenseInfo];
    setAllRecords({ currentMonth: recordsUpdated, lastMonth: allRecords?.lastMonth });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  const handleSubmitIncome = async (values: CreateIncomeValues) => {
    const createIncomeInfo: CreateIncomeResponse = await postRequestWithBearer(values, POST_INCOME_ROUTE, bearerToken);

    // If an error is catched:
    if (createIncomeInfo?.message) {
      // Show notification error

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
      return;
    }

    // Update expenses
    const recordsUpdated = [...currentMonthRecords, createIncomeInfo];
    setAllRecords({ currentMonth: recordsUpdated, lastMonth: allRecords?.lastMonth });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  return {
    handleSubmitExpense,
    handleSubmitIncome,
  };
};

export { useRecords };
