import {
  TableHead, TableRow, TableBody,
} from '@mui/material';

import { ExpensePaid } from '../../interface';
import { RecordTable, TableTitle } from '../../Records.styled';
import { TableCell } from '../../../../../styles';

interface ShowExpensesProps {
  expenses: ExpensePaid[];
}

const ShowExpenses = ({ expenses = [] }: ShowExpensesProps) => {
  if (expenses.length === 0) {
    return null;
  }
  return (
    <>
      <TableTitle>Select the expense:</TableTitle>
      <RecordTable>
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
  );
};

export { ShowExpenses };
