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
import { accountsAtom, allRecordsAtom, userAtom } from '../atoms';
import { useDate } from './useDate';
import { HttpRequestWithBearerToken } from '../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../components/UI/Account/constants';
import { NotificationFunctions } from '../pages/Dashboard/interface';
import { SystemStateEnum } from '../enums';

interface UseRecordsProps {
  notificationFunctions: NotificationFunctions;
}

const useRecords = ({ notificationFunctions }: UseRecordsProps) => {
  const {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  } = notificationFunctions;
  const navigate = useNavigate();
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const [user] = useAtom(userAtom);
  const [accounts] = useAtom(accountsAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const currentMonthRecords = allRecords?.currentMonth;
  const { month: currentMonth, lastMonth } = useDate();

  const updateAmountAccount = async (accountId: string, amount: string, isExpense: boolean) => {
    const amountToNumber = Number(amount.slice(1, amount.length));
    const accountFound = accounts?.find((account) => account._id === accountId);
    const amountToUpdate = accountFound?.amount as number;
    const payload = isExpense
      ? { accountId, amount: amountToUpdate - amountToNumber }
      : { accountId, amount: amountToUpdate + amountToNumber };
    const updateAccountResponse = await HttpRequestWithBearerToken(payload, POST_PUT_ACCOUNT_ROUTE, 'put', bearerToken);

    if (updateAccountResponse?.error) {
      return `Error: ${updateAccountResponse?.error}`;
    }

    return 'Account updated';
  };

  const showErrorNotification = (errorMessage: string) => {
    updateTitle('Create Record: Error');
    updateDescription('Oops! An error ocurred. Try again later.');
    updateStatus(SystemStateEnum.Error);
    toggleShowNotification();
    console.error(`Error while submitting create record: ${errorMessage}`);
    // Navigate to dashboard
    setTimeout(() => {
      navigate(DASHBOARD_ROUTE);
    }, 3000);
  };

  const handleSubmitExpense = async (values: CreateExpenseValues) => {
    const { account: accountId, amount } = values;
    const createExpenseInfo: CreateExpenseResponse = await postRequestWithBearer(values, POST_EXPENSE_ROUTE, bearerToken);

    // If an error is catched:
    if (createExpenseInfo?.message) {
      // Show notification error
      showErrorNotification(`There is an error: ${createExpenseInfo?.message}`);
      return;
    }

    const updateAmount = await updateAmountAccount(accountId, amount, true);
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification(`Updating amount error: ${updateAmount}`);
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
    const { account: accountId, amount } = values;
    const createIncomeInfo: CreateIncomeResponse = await postRequestWithBearer(values, POST_INCOME_ROUTE, bearerToken);

    // If an error is catched:
    if (createIncomeInfo?.message) {
      // Show notification error
      showErrorNotification(`There is an error: ${createIncomeInfo?.message}`);
      return;
    }

    const updateAmount = await updateAmountAccount(accountId, amount, false);
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification(`Updating amount error: ${updateAmount}`);
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
