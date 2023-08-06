import { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import {
  allRecordsAtom, selectedAccountAtom, userAtom, accountsUIAtom,
} from '../../../../atoms';
import { Error } from '../../Error';
import {
  GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND,
} from '../constants';
import { GetRequest } from '../../../../utils';
import { IncomeAndExpensesResponse } from '../interface';
import { Paragraph } from '../../../../styles';
import { List } from '../Records.styled';
import { Record } from '../Record';
import { ErrorResponse } from '../../../../aliasType';
import { todayDate } from '../../../../utils/TodayDate';

let ERROR_TITLE = 'Error.';
let ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';
const NETWORK_CATCH_ERROR = 'Network Error';

const RecordList = () => {
  const { currentMonth, currentYear } = todayDate();
  const [user] = useAtom(userAtom);
  const [accountsUI] = useAtom(accountsUIAtom);
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [selectedAccount] = useAtom(selectedAccountAtom);
  const [error, setError] = useState<ErrorResponse>('No error');

  useEffect(() => {
    const getRecords = async () => {
      try {
        const accountId = selectedAccount?._id;
        const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${currentMonth}/${currentYear}`;
        const response: IncomeAndExpensesResponse = await GetRequest(expensesFullRoute, bearerToken);

        if (response?.error) {
          // handle error
          const errorMessage = response?.message as string;
          if (errorMessage === NETWORK_CATCH_ERROR) {
            ERROR_TITLE = 'Error #401';
            setError('Network Error');
            return;
          }
          ERROR_DESCRIPTION = errorMessage;
          setError('Other Error');
          return;
        }

        if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
          // Show that there are no records and the user may create one.
          setAllRecords([]);
          return;
        }

        const recordFetched = response?.records;
        setAllRecords(recordFetched);
      } catch (errorCatched) {
        const newError = errorCatched as AxiosError;
        ERROR_DESCRIPTION = newError.message;
        setError('Other Error');
      }
    };
    if (!!user && selectedAccount && bearerToken) getRecords();
  }, [bearerToken, currentMonth, currentYear, selectedAccount, setAllRecords, user]);

  if (error !== 'No error') {
    return (
      <Error hideIcon title={ERROR_TITLE} description={ERROR_DESCRIPTION} />
    );
  }

  return (
    <List>
      { (Array.isArray(allRecords) && allRecords.length === 0 && accountsUI.length === 0) && (
        <Paragraph align="center">Create an account to record expenses and incomes.</Paragraph>
      ) }
      { (Array.isArray(allRecords) && allRecords.length === 0 && accountsUI.length > 0) && (
        <Paragraph align="center">There are no records for this account.</Paragraph>
      ) }
      { (Array.isArray(allRecords) && allRecords.length > 0) && allRecords.map((record, index) => (
        <div key={record._id}>
          { (index === 0) && (<Divider />) }
          <Record
            _id={record._id}
            shortName={record.shortName}
            description={record.description}
            category={record.category}
            subCategory={record.subCategory}
            tag={record.tag}
            indebtedPeople={record.indebtedPeople}
            budgets={record.budgets}
            fullDate={record.fullDate}
            formattedTime={record.formattedTime}
            amount={record.amount}
            isPaid={record.isPaid}
            expensesPaid={record.expensesPaid}
          />
          <Divider />
        </div>
      )) }
    </List>
  );
};

export { RecordList };
