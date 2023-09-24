/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { formatDateToString, postRequestWithBearer } from '../utils';
import { POST_DELETE_EXPENSE_ROUTE, POST_DELETE_INCOME_ROUTE } from '../components/UI/Records/constants';
import { DASHBOARD_ROUTE } from '../pages/RoutesConstants';
import {
  CreateExpenseResponse, CreateExpenseValues, CreateIncomeValues, CreateIncomeResponse, DeleteRecordResponse,
} from '../components/UI/Records/interface';
import {
  allRecordsAtom, selectedAccountAtom, userAtom,
} from '../atoms';
import { useDate } from './useDate';
import { HttpRequestWithBearerToken } from '../utils/HttpRequestWithBearerToken';
import { POST_PUT_ACCOUNT_ROUTE } from '../components/UI/Account/constants';
import { NotificationFunctions } from '../pages/Dashboard/interface';
import { SystemStateEnum } from '../enums';
import { AnyRecord } from '../globalInterface';

interface UseRecordsProps {
  notificationFunctions: NotificationFunctions;
  recordToBeDeleted?: AnyRecord;
  deleteRecordExpense?: boolean;
  closeDeleteRecordModalCb?: () => void;
}

interface UpdateAmountAccountProps {
  amount: string;
  isExpense: boolean;
  deleteRecord?: boolean;
}

const useRecords = ({
  notificationFunctions, recordToBeDeleted, deleteRecordExpense, closeDeleteRecordModalCb = () => {},
}: UseRecordsProps) => {
  const {
    updateTitle,
    updateDescription,
    updateStatus,
    toggleShowNotification,
  } = notificationFunctions;
  const navigate = useNavigate();
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const [user] = useAtom(userAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  const currentMonthRecords = allRecords?.currentMonth;
  const { month: currentMonth, lastMonth } = useDate();

  const updateAmountAccount = async ({
    amount, isExpense, deleteRecord = false,
  }: UpdateAmountAccountProps) => {
    const amountToNumber = Number(amount.slice(1, amount.length));
    const amountToUpdate = selectedAccount?.amount as number;
    const accountId = selectedAccount?._id as string;

    const payloadDeleteRecord = (isExpense)
      ? { accountId, amount: amountToUpdate + amountToNumber }
      : { accountId, amount: amountToUpdate - amountToNumber };
    const payloadCreateRecord = isExpense
      ? { accountId, amount: amountToUpdate - amountToNumber }
      : { accountId, amount: amountToUpdate + amountToNumber };
    const payload = deleteRecord ? payloadDeleteRecord : payloadCreateRecord;

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
    const { amount } = values;
    const createExpenseInfo: CreateExpenseResponse = await postRequestWithBearer(values, POST_DELETE_EXPENSE_ROUTE, bearerToken);

    // If an error is catched:
    if (createExpenseInfo?.message) {
      // Show notification error
      showErrorNotification(`There is an error: ${createExpenseInfo?.message}`);
      return;
    }

    const updateAmount = await updateAmountAccount({ amount, isExpense: true });
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
    const { amount } = values;
    const createIncomeInfo: CreateIncomeResponse = await postRequestWithBearer(values, POST_DELETE_INCOME_ROUTE, bearerToken);

    // If an error is catched:
    if (createIncomeInfo?.message) {
      // Show notification error
      showErrorNotification(`There is an error: ${createIncomeInfo?.message}`);
      return;
    }

    const updateAmount = await updateAmountAccount({ amount, isExpense: false });
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

  const deleteRecord = async () => {
    const amountOfRecord = recordToBeDeleted?.amount as string;
    const recordId = recordToBeDeleted?._id as string;
    const valuesDeleteRecord = { recordId };
    const route = deleteRecordExpense ? POST_DELETE_EXPENSE_ROUTE : POST_DELETE_INCOME_ROUTE;
    console.log('selectedAccount', selectedAccount);
    const responseDeleteRecord: DeleteRecordResponse = await HttpRequestWithBearerToken(
      valuesDeleteRecord,
      route,
      'delete',
      bearerToken,
    );

    if (responseDeleteRecord.error) {
      // mostrar notification
      // eslint-disable-next-line no-console
      console.error(`Error deleting expense: ${responseDeleteRecord.error} ${responseDeleteRecord.message}`);
      return;
    }

    // Update Amount of the account.
    const updateAmount = await updateAmountAccount({ amount: amountOfRecord, isExpense: false });
    if (updateAmount.includes('Error')) {
      // show notification error
      // showErrorNotification(`Updating amount error: ${updateAmount}`);
      console.error(`Error updating amount: ${updateAmount}`);
      return;
    }

    // Cerrar Drawer
    // Refetch data
    closeDeleteRecordModalCb();
  };

  return {
    handleSubmitExpense,
    handleSubmitIncome,
    deleteRecord,
  };
};

export { useRecords };
