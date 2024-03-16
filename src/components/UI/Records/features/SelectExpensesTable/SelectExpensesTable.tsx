import { useState, useMemo } from 'react';
import {
  TableRow, TableBody, Checkbox, TableContainer,
  Table, TablePagination,
} from '@mui/material';

import { EnhancedTableToolbar } from './EnhancedToolbar';
import { EnhancedTableHead } from './EnhancedTableHead';
import { Order, ExpensePaidTable } from './interface';
import { ExpensePaid } from '../../../../../globalInterface';
import { orderExpenses } from './utils';

import { AppIcon } from '../../../Icons';
import {
  TableCell, CancelButton, FlexContainer, ConfirmButton, AppColors,
} from '../../../../../styles';
import { SelectExpensesCell, SelectExpensesContainer } from '../Features.styled';
import { usePaginationTable } from '../../../../../hooks/usePaginationTable';
import { EmptyTableRow } from '../../../Table/EmptyTableRow';
import { useAppSelector } from '../../../../../redux/hooks';

interface SelectExpensesTableProps {
  expenses: ExpensePaid[];
  selectedExpenses: ExpensePaid[];
  modifySelectedExpenses: (expenses: ExpensePaid[]) => void;
  closeDrawer: () => void;
}

function SelectExpensesTable({
  expenses = [], modifySelectedExpenses, selectedExpenses, closeDrawer,
}: SelectExpensesTableProps) {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const {
    emptyRows, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage,
  } = usePaginationTable({ arrayOfOptions: expenses, initialRowsPerPage: 10 });

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ExpensePaidTable>('amountFormatted');

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
    const selectedExpenseFound = selectedExpenses.find((selectedExpense) => selectedExpense._id === expense._id);
    if (selectedExpenseFound) {
      // If found the expense, remove it.
      const filteredExpenses = selectedExpenses.filter((selectedExpense) => selectedExpense._id !== expense._id);
      modifySelectedExpenses(filteredExpenses);
      return;
    }

    // If not found, the expense is new, add it to the array.
    const newSelectedExpenses = [...selectedExpenses, expense];
    modifySelectedExpenses(newSelectedExpenses);
  };

  const isSelected = (expenseId: string) => selectedExpenses.some((expense) => expense._id === expenseId);

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
                  <SelectExpensesCell
                    component="th"
                    id={labelId}
                    scope="row"
                    noHorizontalPadding
                  >
                    {row.shortName}
                  </SelectExpensesCell>
                  <SelectExpensesCell align="right">{row.amountFormatted}</SelectExpensesCell>
                  { (!isMobile) && (<SelectExpensesCell align="right">{row.fullDate}</SelectExpensesCell>) }
                  <SelectExpensesCell align="right" noHorizontalPadding>
                    { (row.isPaid) ? <AppIcon icon="TickMark" /> : <AppIcon icon="Close" fillColor={AppColors.negative} />}
                  </SelectExpensesCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (<EmptyTableRow emptyRows={emptyRows} colSpan={6} />)}
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
      <FlexContainer justifyContent="space-between">
        <CancelButton onClick={closeDrawer}>Cancel</CancelButton>
        <ConfirmButton onClick={closeDrawer}>Done</ConfirmButton>
      </FlexContainer>
    </SelectExpensesContainer>
  );
}

export { SelectExpensesTable };
