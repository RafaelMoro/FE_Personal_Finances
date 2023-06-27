/* eslint-disable no-console */
import { useEffect } from 'react';
import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { allRecordsAtom, selectedAccountAtom, userAtom } from '../../../../atoms';
import {
  GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND,
} from '../constants';
import { GetRequest, MONTHS } from '../../../../utils';
import { IncomeAndExpensesResponse } from '../interface';
import { Paragraph } from '../../../../styles';
import { List } from '../Records.styled';
import { Record } from '../Record';

const RecordList = () => {
  const dateOfToday = new Date();
  const currentMonth = MONTHS[dateOfToday.getMonth()];
  const [user] = useAtom(userAtom);
  const [allRecords, setAllRecords] = useAtom(allRecordsAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [selectedAccount] = useAtom(selectedAccountAtom);

  useEffect(() => {
    const getRecords = async () => {
      const accountId = selectedAccount?._id;
      const expensesFullRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${currentMonth}`;
      // eslint-disable-next-line max-len
      const response: IncomeAndExpensesResponse = await GetRequest(expensesFullRoute, bearerToken);
      console.log(response);

      if (response?.error) {
        // handle error
      }

      if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
        // Show that there are no records and the user may create one.
        setAllRecords([]);
        return;
      }

      const recordFetched = response?.records;
      setAllRecords(recordFetched);
    };
    if (!!user && selectedAccount && bearerToken) getRecords();
  }, [bearerToken, currentMonth, selectedAccount, setAllRecords, user]);

  return (
    <List>
      { (Array.isArray(allRecords) && allRecords.length === 0) && (
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
