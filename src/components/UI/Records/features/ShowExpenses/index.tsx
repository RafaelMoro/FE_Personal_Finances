/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  TableHead, TableRow, TableBody,
} from '@mui/material';

import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { ExpensePaid } from '../../interface';
import { EnhancedTable } from '../SelectExpensesTable/EnhancedTable';
import { RecordTable, TableTitle } from '../../Records.styled';
import { TableCell, PrimaryButton, Paragraph } from '../../../../../styles';
import { selectedAccountAtom, userAtom } from '../../../../../atoms';
import { GetRequest } from '../../../../../utils';
import { GET_EXPENSES } from '../../constants';

interface ShowExpensesProps {
  seeTable?: boolean;
  addExpense: (newExpense: ExpensePaid) => void;
}

const ShowExpenses = ({ addExpense, seeTable = true }: ShowExpensesProps) => {
  const [user] = useAtom(userAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const selectedAccountId = selectedAccount?._id;
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [expenses, setExpenses] = useState<ExpensePaid []>([]);
  const [noExpensesFound, setNoExpensesFound] = useState<boolean>(false);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const fullRoute = `${GET_EXPENSES}/${selectedAccountId}`;
        const expensesFetched = await GetRequest(fullRoute, bearerToken);

        if (Array.isArray(expensesFetched)) {
        // response returned the array of expenses
          const expensesShorted = expensesFetched.map((expense) => {
            const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
              _id, shortName, amount, fullDate, formattedTime,
            } = expense;
            const shortExpense: ExpensePaid = {
              _id, shortName, amount, fullDate, formattedTime,
            };
            return shortExpense;
          });
          setExpenses(expensesShorted);
          return;
        }

        // The response returned = No expense found with that account id
        console.log(expensesFetched);
        setNoExpensesFound(true);
      } catch (errorCatched) {
        // catch error
        const newError = errorCatched as AxiosError;
        console.error(newError.message);
      }
    };
    if (!!user && bearerToken) getExpenses();
  }, [bearerToken, selectedAccountId, user]);

  if (seeTable) {
    return (
      <EnhancedTable expenses={expenses} />
    );
  }

  return (
    <div>
      { (noExpensesFound) && (<Paragraph>No expenses found for this account.</Paragraph>) }
      { (expenses.length > 0) && (
      <>
        <TableTitle isGrid>Select the expense:</TableTitle>
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
};

export { ShowExpenses };
