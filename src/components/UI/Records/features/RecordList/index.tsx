/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import {
  allRecordsAtom, selectedAccountAtom, totalAtom, userAtom,
} from '../../../../../atoms';
import { Error } from '../../../Error';
import {
  GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND,
} from '../../constants';
import { GetRequest, formatNumberToCurrency } from '../../../../../utils';
import { IncomeAndExpensesResponse } from '../../interface';
import { AppColors } from '../../../../../styles';
import { List } from '../../Records.styled';
import { ErrorResponse } from '../../../../../aliasType';
import { useDate } from '../../../../../hooks/useDate';
import { NETWORK_CATCH_ERROR } from '../../../../../constants';
import { NoRecordsFoundOnMonth } from '../NoRecordsFoundOnMonth';
import { getRecordsByMonthAndYear } from '../../../../../utils/getRecordByMonthAndYear';
import { AnyRecord } from '../../../../../globalInterface';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { NoAccountsFound } from '../../../Account/features/NoAccountsFound';
import { Loader } from '../../../../../animations/Loader';

let ERROR_TITLE = 'Error.';
let ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

const RecordList = () => {
  const {
    month, completeCurrentMonth, completeLastMonth, year, lastMonth,
  } = useDate();
  const [user] = useAtom(userAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [selectedAccount] = useAtom(selectedAccountAtom);
  const accountId = selectedAccount?._id ?? 'Account ID not found';
  const [error, setError] = useState<ErrorResponse>('No error');
  const [errorLastMonthRecords, setErrorLastMonthRecords] = useState<boolean>(false);
  const [loadingCurrentMonthRecords, setloadingCurrentMonthRecords] = useState<boolean>(false);
  const [loadingLastMonthRecords, setLoadingLastMonthRecords] = useState<boolean>(false);

  const backgroundColor = selectedAccount?.backgroundColor?.color ?? AppColors.bgColorGrey;
  const color = selectedAccount?.color?.color ?? AppColors.black;

  const LoadingCurrentMonthRecords = () => setloadingCurrentMonthRecords(true);
  const NotLoadingCurrentMonthRecords = () => setloadingCurrentMonthRecords(false);

  useEffect(() => {
    const getRecords = async () => {
      try {
        LoadingCurrentMonthRecords();
        const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
        const response: IncomeAndExpensesResponse = await GetRequest(expensesFullRoute, bearerToken);

        if (response?.error) {
          // handle error
          const errorMessage = response?.message as string;
          if (errorMessage === NETWORK_CATCH_ERROR) {
            ERROR_TITLE = 'Error #401';
            NotLoadingCurrentMonthRecords();
            setError('Network Error');
            return;
          }
          ERROR_DESCRIPTION = errorMessage;
          setError('Other Error');
          NotLoadingCurrentMonthRecords();
          return;
        }

        if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
          // Show that there are no records and the user may create one.
          setAllRecords({ ...allRecords, currentMonth: [] });
          setTotal({
            ...total,
            currentMonth: {
              expenseTotal: '$0.00',
              incomeTotal: '$0.00',
            },
          });
          NotLoadingCurrentMonthRecords();
          return;
        }

        const recordFetched = response?.records;
        NotLoadingCurrentMonthRecords();

        let expenseTotalCounter = 0;
        let incomeTotalCounter = 0;
        recordFetched.forEach((record) => {
          if (record?.isPaid) {
            expenseTotalCounter += record.amount;
            return;
          }
          incomeTotalCounter += record.amount;
        });
        setTotal({
          ...total,
          currentMonth: {
            expenseTotal: formatNumberToCurrency(expenseTotalCounter),
            incomeTotal: formatNumberToCurrency(incomeTotalCounter),
          },
        });
        setAllRecords({ ...allRecords, currentMonth: recordFetched });
      } catch (errorCatched) {
        const newError = errorCatched as AxiosError;
        ERROR_DESCRIPTION = newError.message;
        setError('Other Error');
      }
    };
    if (!!user && selectedAccount && bearerToken) getRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bearerToken, month, year, selectedAccount, setAllRecords, user, accountId]);

  const handleError = (errorCatched: string) => {
    setErrorLastMonthRecords(true);
    console.error(errorCatched);
  };
  const LoadingLastMonthRecords = () => setLoadingLastMonthRecords(true);
  const NotLoadingLastMonthRecords = () => setLoadingLastMonthRecords(false);
  const updateLastMonthRecords = (fetchedRecords: AnyRecord[]) => setAllRecords({
    ...allRecords,
    lastMonth: fetchedRecords,
  });
  const updateTotalLastMonth = (expenseTotal: string, incomeTotal: string) => setTotal({
    ...total,
    lastMonth: {
      expenseTotal,
      incomeTotal,
    },
  });

  const handleFetchLastMonthRecords = async () => {
    await getRecordsByMonthAndYear({
      accountId,
      month: lastMonth,
      year,
      bearerToken,
      handleErrorCallback: handleError,
      isLoadingCallback: LoadingLastMonthRecords,
      isNotLoadingCallback: NotLoadingLastMonthRecords,
      handleFetchRecordsCallback: updateLastMonthRecords,
      updateTotalCallback: updateTotalLastMonth,
    });
  };

  if (loadingCurrentMonthRecords) {
    return (
      <Loader />
    );
  }

  if (!selectedAccount) {
    return (
      <NoAccountsFound />
    );
  }

  if (allRecords.currentMonth.length === 0 && allRecords.lastMonth.length === 0) {
    return (
      <NoRecordsFound />
    );
  }

  return (
    <List>
      <MonthRecords
        backgroundColor={backgroundColor}
        color={color}
        openedAccordeon
        titleMonthAccordeon={`Current month: ${completeCurrentMonth}`}
        totalExpense={total.currentMonth.expenseTotal}
        totalIncome={total.currentMonth.incomeTotal}
        accountId={accountId}
        records={allRecords.currentMonth}
        loading={loadingCurrentMonthRecords}
        error={error !== 'No error'}
        onEmptyCb={() => <NoRecordsFoundOnMonth month={completeCurrentMonth} accountTitle={selectedAccount?.title ?? ''} />}
        onErrorCb={() => <Error hideIcon title={ERROR_TITLE} description={ERROR_DESCRIPTION} />}
        onLoadingCb={() => (
          <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="current-month" />
        )}
      />
      <MonthRecords
        backgroundColor={backgroundColor}
        color={color}
        openedAccordeon={false}
        titleMonthAccordeon={`Last month: ${completeLastMonth}`}
        totalExpense={total.lastMonth.expenseTotal}
        totalIncome={total.lastMonth.incomeTotal}
        onClickCb={handleFetchLastMonthRecords}
        accountId={accountId}
        records={allRecords.lastMonth}
        loading={loadingLastMonthRecords}
        error={errorLastMonthRecords}
        onEmptyCb={() => <NoRecordsFoundOnMonth month={completeLastMonth} accountTitle={selectedAccount?.title ?? ''} />}
        onErrorCb={() => <Error hideIcon description="An error has ocurred. Please try again later." />}
        onLoadingCb={() => (
          <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="last-month" />
        )}
      />
    </List>
  );
};

export { RecordList };
