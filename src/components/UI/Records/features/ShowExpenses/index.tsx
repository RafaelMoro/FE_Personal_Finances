import {
  TableHead, TableRow, TableBody, TablePagination,
} from '@mui/material';
import { useState, useMemo } from 'react';

import { ExpensePaid } from '../../interface';
import { RecordTable, TableTitle } from '../../Records.styled';
import { TableCell } from '../../../../../styles';

interface ShowExpensesProps {
  expenses: ExpensePaid[];
}

const ShowExpenses = ({ expenses = [] }: ShowExpensesProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;

  const visibleRows = useMemo(
    () => expenses.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [expenses, page, rowsPerPage],
  );

  if (expenses.length === 0) {
    return null;
  }
  return (
    <>
      <TableTitle>Expenses Selected: </TableTitle>
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
          { visibleRows.map((expense, index) => (
            <TableRow key={`${expense._id}-${index + 1}`}>
              <TableCell>{expense.shortName}</TableCell>
              <TableCell>{expense.fullDate}</TableCell>
              <TableCell>{expense.formattedTime}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
          )) }
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </RecordTable>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={expenses.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export { ShowExpenses };
