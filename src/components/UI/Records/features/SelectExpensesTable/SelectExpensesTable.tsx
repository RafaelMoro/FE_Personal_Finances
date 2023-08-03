import { useState, useMemo } from 'react';
import {
  TableRow, TableBody, Checkbox, TableContainer,
  Table, TablePagination,
} from '@mui/material';

import { EnhancedTableToolbar } from './EnhancedToolbar';
import { EnhancedTableHead } from './EnhancedTableHead';
import { Order, ExpensePaidTable } from './interface';
import { ExpensePaid } from '../../interface';
import { orderExpenses } from './utils';
import { PrimaryButton, TableCell } from '../../../../../styles';
import { SelectExpensesContainer } from '../../Records.styled';

interface SelectExpensesTableProps {
  expenses: ExpensePaid[];
  selectedExpenses: ExpensePaid[];
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  closeDrawer: () => void;
}

function SelectExpensesTable({
  expenses = [], modifySelectedExpenses, selectedExpenses, closeDrawer,
}: SelectExpensesTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ExpensePaidTable>('amount');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ExpensePaidTable,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      modifySelectedExpenses(expenses);
      return;
    }
    modifySelectedExpenses([]);
  };

  const handleSelectExpense = (event: React.MouseEvent<unknown>, expense: ExpensePaid) => {
    const selectedExpeseIndex = selectedExpenses.indexOf(expense);
    let newSelectedExpense: ExpensePaid[] = [];

    if (selectedExpeseIndex === -1) {
      // The item does not exist in the array.
      newSelectedExpense = newSelectedExpense.concat(selectedExpenses, expense);
    } else if (selectedExpeseIndex === 0) {
      newSelectedExpense = newSelectedExpense.concat(selectedExpenses.slice(1));
    } else if (selectedExpeseIndex === selectedExpenses.length - 1) {
      newSelectedExpense = newSelectedExpense.concat(selectedExpenses.slice(0, -1));
    } else if (selectedExpeseIndex > 0) {
      newSelectedExpense = newSelectedExpense.concat(
        selectedExpenses.slice(0, selectedExpeseIndex),
        selectedExpenses.slice(selectedExpeseIndex + 1),
      );
    }

    modifySelectedExpenses(newSelectedExpense);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (expenseId: string) => selectedExpenses.some((expense) => expense._id === expenseId);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;

  const visibleRows: ExpensePaid[] = useMemo(
    () => orderExpenses(expenses, order, orderBy).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [expenses, order, orderBy, page, rowsPerPage],
  );

  return (
    <SelectExpensesContainer>
      <EnhancedTableToolbar numSelected={selectedExpenses.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selectedExpenses.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={expenses.length}
          />
          <TableBody>
            {visibleRows.map((row) => {
              const isItemSelected = isSelected(row._id);
              const labelId = `expense-${row._id}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleSelectExpense(event, row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.shortName}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.fullDate}</TableCell>
                  <TableCell align="right">{row.formattedTime}</TableCell>
                </TableRow>
              );
            })}
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
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <PrimaryButton onClick={closeDrawer}>Select Expenses</PrimaryButton>
    </SelectExpensesContainer>
  );
}

export { SelectExpensesTable };
