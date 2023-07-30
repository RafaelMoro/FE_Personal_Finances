/* eslint-disable no-console */
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
import { TableCell } from '../../../../../styles';
import { SelectExpensesContainer } from '../../Records.styled';

interface EnhancedTableProps {
  expenses: ExpensePaid[];
}

function EnhancedTable({ expenses = [] }: EnhancedTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ExpensePaidTable>('amount');
  const [selected, setSelected] = useState<readonly string[]>([]);
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
      const newSelected = expenses.map((row) => row._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectExpense = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelectedExpense: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelectedExpense = newSelectedExpense.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelectedExpense = newSelectedExpense.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelectedExpense = newSelectedExpense.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedExpense = newSelectedExpense.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelectedExpense);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

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
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selected.length}
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
                  onClick={(event) => handleSelectExpense(event, row._id)}
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
    </SelectExpensesContainer>
  );
}

export { EnhancedTable };
