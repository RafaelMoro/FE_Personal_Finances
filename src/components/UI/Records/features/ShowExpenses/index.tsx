/* eslint-disable no-console */
import { useEffect } from 'react';
import { TableHead, TableRow, TableBody } from '@mui/material';

import { useAtom } from 'jotai';
import { AxiosRequestHeaders } from 'axios';
import { ExpensePaid } from '../../interface';
import { RecordTable, TableTitle } from '../../Records.styled';
import { TableCell, PrimaryButton } from '../../../../../styles';
import { selectedAccountAtom, userAtom } from '../../../../../atoms';
import { GetRequest } from '../../../../../utils';
import { GET_EXPENSES } from '../../constants';

interface ShowExpensesProps {
  expenses: ExpensePaid[];
  // Pass the table to see expenses added to record template
  seeExpenses?: boolean;
  addExpense: (newExpense: ExpensePaid) => void;
}

const ShowExpenses = ({ expenses = [], addExpense, seeExpenses = false }: ShowExpensesProps) => {
  const [user] = useAtom(userAtom);
  // @TODO:  Working on getting Id to pass it to the get expense fn
  const [selectedAccount] = useAtom(selectedAccountAtom);
  // const { _ } = selectedAccount;
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;
  useEffect(() => {
    const getExpenses = async () => {
      // It's missing to pass the account id to get the expenses
      const expensesFetched = await GetRequest(GET_EXPENSES, bearerToken);
      console.log(expensesFetched);
    };
    if (!!user && bearerToken) getExpenses();
  }, [bearerToken, user]);

  if (seeExpenses) {
    return (
      <div>
        <h1>Expenses related to income:</h1>
        { (expenses.length > 0) && (
          <>
            <TableTitle isGrid>Expenses Paid:</TableTitle>
            <RecordTable isGrid>
              <TableHead>
                <TableRow>
                  <TableCell>Name:</TableCell>
                  <TableCell>Date:</TableCell>
                  <TableCell>Time:</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { expenses.map((expense, index) => (
                  <TableRow key={`${expense._id}-${index + 1}`}>
                    <TableCell>{expense.shortName}</TableCell>
                    <TableCell>{expense.fullDate}</TableCell>
                    <TableCell>{expense.formattedTime}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </RecordTable>
          </>
        ) }
      </div>
    );
  }

  return (
    <div>
      <h1>Select the expense:</h1>
    </div>
  );
};

export { ShowExpenses };
