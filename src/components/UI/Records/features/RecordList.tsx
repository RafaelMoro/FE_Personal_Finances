/* eslint-disable no-console */
import { useEffect } from 'react';
import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';

import { selectedAccountAtom, userAtom } from '../../../../atoms';
import { GET_EXPENSES_ROUTE, GET_INCOMES_ROUTE, NO_EXPENSES_FOUND } from '../constants';
import { GetRequest } from '../../../../utils';
import { RecordListProps } from '../interface';
import { List } from '../Records.styled';
import { Record } from '../Record';

const RecordList = ({ records }: RecordListProps) => {
  const [user] = useAtom(userAtom);
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [selectedAccount] = useAtom(selectedAccountAtom);

  useEffect(() => {
    const getRecords = async () => {
      const accountId = selectedAccount?._id;
      console.log(accountId);
      const expensesFullRoute = `${GET_EXPENSES_ROUTE}/${accountId}`;
      const incomesFullRooute = `${GET_INCOMES_ROUTE}/${accountId}`;
      const expenses = await GetRequest(expensesFullRoute, bearerToken);
      const incomes = await GetRequest(incomesFullRooute, bearerToken);

      if (expenses === NO_EXPENSES_FOUND) {
        // Show that there are no records and the user may create one.
      }

      console.log(expenses);
    };
    if (!!user && selectedAccount && bearerToken) getRecords();
  }, [bearerToken, selectedAccount, user]);

  return (
    <List>
      { records.length > 0 && records.map((record, index) => (
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
