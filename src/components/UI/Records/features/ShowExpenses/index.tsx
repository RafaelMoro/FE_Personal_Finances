import {
  TableHead, TableRow, TableBody, TablePagination,
} from '@mui/material';
import { useMemo } from 'react';

import { ExpensePaid } from '../../interface';
import { RecordTable, TableTitle } from '../../Records.styled';
import { EmptyTableRow } from '../../../Table/EmptyTableRow';
import { TableCell } from '../../../../../styles';
import { usePaginationTable } from '../../../../../hooks/usePaginationTable';

interface ShowExpensesProps {
  expenses: ExpensePaid[];
}

const ShowExpenses = ({ expenses = [] }: ShowExpensesProps) => {
  const {
    emptyRows, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage,
  } = usePaginationTable({ arrayOfOptions: expenses });

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
          {emptyRows > 0 && (<EmptyTableRow emptyRows={emptyRows} colSpan={4} />)}
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
