/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { formatDateToString, postRequestWithBearer } from '../utils';
import { POST_EXPENSE_ROUTE, POST_INCOME_ROUTE } from '../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../pages/RoutesConstants';
import {
  CreateExpenseResponse, CreateExpenseValues, CreateIncomeValues, CreateIncomeResponse,
} from '../components/UI/Records/interface';
import { allRecordsAtom, userAtom } from '../atoms';
import { useDate } from './useDate';

const useRecords = () => {
  const navigate = useNavigate();
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const currentMonthRecords = allRecords?.currentMonth;
  const { month: currentMonth, lastMonth } = useDate();

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
    const { date } = values;
    const { monthFormatted } = formatDateToString(date);
    if (currentMonth === monthFormatted) {
      // Put the record on current month
      const recordsUpdated = [...currentMonthRecords, createExpenseInfo];
      setAllRecords({ ...allRecords, currentMonth: recordsUpdated });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
      return;
    }
    if (lastMonth === monthFormatted) {
      // Put the record on current month
      const recordsUpdated = [...allRecords.lastMonth, createExpenseInfo];
      setAllRecords({ ...allRecords, lastMonth: recordsUpdated });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
      return;
    }

    // Else Put it on older records
    const olderRecordsUpdated = [...allRecords.olderRecords, createExpenseInfo];
    setAllRecords({ ...allRecords, olderRecords: olderRecordsUpdated });

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

    // Update incomes
    const { date } = values;
    const { monthFormatted } = formatDateToString(date);

    if (currentMonth === monthFormatted) {
      // Put the record on current month
      const recordsUpdated = [...currentMonthRecords, createIncomeInfo];
      setAllRecords({ ...allRecords, currentMonth: recordsUpdated });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
      return;
    }
    if (lastMonth === monthFormatted) {
      // Put the record on current month
      const recordsUpdated = [...allRecords.lastMonth, createIncomeInfo];
      setAllRecords({ ...allRecords, lastMonth: recordsUpdated });

      // Navigate to dashboard
      navigate(DASHBOARD_ROUTE);
      return;
    }

    // Else Put it on older records
    const olderRecordsUpdated = [...allRecords.olderRecords, createIncomeInfo];
    setAllRecords({ ...allRecords, olderRecords: olderRecordsUpdated });

    // Navigate to dashboard
    navigate(DASHBOARD_ROUTE);
  };

  return {
    handleSubmitExpense,
    handleSubmitIncome,
  };
};

export { useRecords };
