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
import { SystemStateEnum } from '../enums';
import { AnyRecord } from '../globalInterface';
import { useNotification } from './useNotification';

interface UseRecordsProps {
  recordToBeDeleted?: AnyRecord;
  deleteRecordExpense?: boolean;
  closeDeleteRecordModalCb?: () => void;
  closeDrawer?: () => void;
}

interface UpdateAmountAccountProps {
  amount: string;
  isExpense: boolean;
  deleteRecord?: boolean;
}

interface ShowErrorNotificationProps {
  errorMessage: string;
  action: string;
  goToDashboard?: boolean;
}

const useRecords = ({
  recordToBeDeleted, deleteRecordExpense, closeDeleteRecordModalCb = () => {}, closeDrawer = () => {},
}: UseRecordsProps) => {
  const { updateGlobalNotification } = useNotification({});
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

  const showErrorNotification = ({ errorMessage, action, goToDashboard = false }: ShowErrorNotificationProps) => {
    updateGlobalNotification({
      newTitle: `${action} Record: Error`,
      newDescription: 'Oops! An error ocurred. Try again later.',
      newStatus: SystemStateEnum.Error,
    });
    console.error(`Error while submitting ${action} record: ${errorMessage}`);

    if (goToDashboard) {
      // Navigate to dashboard
      setTimeout(() => {
        navigate(DASHBOARD_ROUTE);
      }, 3000);
    }
  };

  const handleSubmitExpense = async (values: CreateExpenseValues) => {
    const { amount } = values;
    const createExpenseInfo: CreateExpenseResponse = await postRequestWithBearer(values, POST_DELETE_EXPENSE_ROUTE, bearerToken);

    // If an error is catched:
    if (createExpenseInfo?.message) {
      // Show notification error
      showErrorNotification({
        errorMessage: `There is an error: ${createExpenseInfo?.message}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    const updateAmount = await updateAmountAccount({ amount, isExpense: true });
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification({
        errorMessage: `Updating amount error: ${updateAmount}`,
        action: 'Create',
        goToDashboard: true,
      });
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
      showErrorNotification({
        errorMessage: `There is an error: ${createIncomeInfo?.message}`,
        action: 'Create',
        goToDashboard: true,
      });
      return;
    }

    const updateAmount = await updateAmountAccount({ amount, isExpense: false });
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification({
        errorMessage: `Updating amount error: ${updateAmount}`,
        action: 'Create',
        goToDashboard: true,
      });
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
    const responseDeleteRecord: DeleteRecordResponse = await HttpRequestWithBearerToken(
      valuesDeleteRecord,
      route,
      'delete',
      bearerToken,
    );

    if (responseDeleteRecord.error) {
      // mostrar notification
      showErrorNotification({
        errorMessage: `Error while deleting record: ${responseDeleteRecord.error}`,
        action: 'Delete',
      });
      closeDeleteRecordModalCb();
      closeDrawer();
      return;
    }

    // Update Amount of the account.
    const updateAmount = await updateAmountAccount({ amount: amountOfRecord, isExpense: false, deleteRecord: true });
    if (updateAmount.includes('Error')) {
      // show notification error
      showErrorNotification({
        errorMessage: `Error updating amount while deleting record: ${updateAmount}`,
        action: 'Delete',
      });
      closeDeleteRecordModalCb();
      closeDrawer();
      return;
    }

    // Show success notification
    updateGlobalNotification({
      newTitle: 'Record Deleted Succesfully',
      newDescription: '',
      newStatus: SystemStateEnum.Success,
    });
    closeDeleteRecordModalCb();
    closeDrawer();
    // Refetch data
  };

  return {
    handleSubmitExpense,
    handleSubmitIncome,
    deleteRecord,
  };
};

export { useRecords };
