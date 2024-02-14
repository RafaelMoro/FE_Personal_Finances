/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
import { useEffect } from 'react';

import { Error } from '../../../Error';
import {
  GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE,
} from '../../constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { AppColors, FlexContainer } from '../../../../../styles';
import { List } from '../../Records.styled';
import { useDate } from '../../../../../hooks/useDate';
import { NoRecordsFoundOnMonth } from '../NoRecordsFoundOnMonth';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { NoAccountsFound } from '../../../Account/features/NoAccountsFound';
import { HorizontalLoader } from '../../../HorizontalLoader';
import { useFetchRecordsByMonthYearQuery } from '../../../../../redux/slices/Records/actions/fetchRecordsApiSlice';

const ERROR_TITLE = 'Error.';
const ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

const RecordList = () => {
  const dispatch = useAppDispatch();
  const {
    month, completeCurrentMonth, completeLastMonth, year, lastMonth,
  } = useDate();
  const user = useAppSelector((state) => state.user.userInfo);
  const recordsState = useAppSelector((state) => state.records);
  const { allRecords, totalRecords } = recordsState;
  const bearerToken = user?.bearerToken as string;

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountId = selectedAccount?._id ?? 'Account ID not found';

  const recordsRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
  const response = useFetchRecordsByMonthYearQuery({ route: recordsRoute, bearerToken });
  console.log('response', response);

  const color = selectedAccount?.backgroundColorUI?.color ?? AppColors.black;

  // useEffect(() => {
  //   // Fetch if user, accounts exists and current month records are null
  //   if (user && accounts && !recordsState.allRecords.currentMonth) {
  //     const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
  //     dispatch(fetchCurrentMonthRecords({ recordsFullRoute: expensesFullRoute, bearerToken }));
  //   }
  // }, [accountId, accounts, bearerToken, dispatch, month, recordsState.allRecords.currentMonth, selectedAccount, user, year]);

  const handleFetchLastMonthRecords = async () => {
    try {
      const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${lastMonth}/${year}`;
      // await dispatch(fetchLastMonthRecords({ recordsFullRoute: expensesFullRoute, bearerToken })).unwrap();
    } catch (err) {
      console.error(`Error ocurred while fetching last month records: ${err}`);
    }
  };

  if (recordsState.loading) {
    return (
      <FlexContainer justifyContent="center" alignItems="center">
        <HorizontalLoader />
      </FlexContainer>
    );
  }

  if (!recordsState.loading && accounts && accounts.length === 0) {
    return (
      <NoAccountsFound />
    );
  }

  if ((allRecords.currentMonth && allRecords.lastMonth)
  && (allRecords.currentMonth.length === 0 && allRecords.lastMonth.length === 0)
  && (selectedAccount && !recordsState.loading)) {
    return (
      <NoRecordsFound />
    );
  }

  return (
    <List>
      <MonthRecords
        color={color}
        openedAccordeon
        titleMonthAccordeon={`Current month: ${completeCurrentMonth}`}
        totalExpense={totalRecords.currentMonth.expenseTotal}
        totalIncome={totalRecords.currentMonth.incomeTotal}
        accountId={accountId}
        records={allRecords.currentMonth ?? []}
        loading={recordsState.loading}
        error={recordsState.error}
        onEmptyCb={() => <NoRecordsFoundOnMonth month={completeCurrentMonth} accountTitle={selectedAccount?.title ?? ''} />}
        onErrorCb={() => <Error hideIcon title={ERROR_TITLE} description={ERROR_DESCRIPTION} />}
        onLoadingCb={() => (
          <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="current-month" />
        )}
      />
      <MonthRecords
        color={color}
        openedAccordeon={false}
        titleMonthAccordeon={`Last month: ${completeLastMonth}`}
        totalExpense={totalRecords.lastMonth.expenseTotal}
        totalIncome={totalRecords.lastMonth.incomeTotal}
        onClickCb={handleFetchLastMonthRecords}
        accountId={accountId}
        records={allRecords.lastMonth ?? []}
        loading={recordsState.loadingOnAction}
        error={recordsState.errorOnAction}
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
