/* eslint-disable no-console */
import { useEffect, useState, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import {
  TableHead, TableRow, TableBody, Checkbox, TableSortLabel, Box,
  IconButton, Typography, Toolbar, Tooltip, Paper, TableContainer,
  Table, TablePagination, FormControlLabel, Switch,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useAtom } from 'jotai';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { stableSort, Order, getComparator } from '../../../../../utils/ComparatorTable';

import { ExpensePaid } from '../../interface';
import { RecordTable, TableTitle } from '../../Records.styled';
import { TableCell, PrimaryButton, Paragraph } from '../../../../../styles';
import { selectedAccountAtom, userAtom } from '../../../../../atoms';
import { GetRequest } from '../../../../../utils';
import { GET_EXPENSES } from '../../constants';

type ExpensePaidTable = Omit<ExpensePaid, '_id'>;

const rows = [
  {
    _id: '123-456',
    shortName: 'Burgers Hudson',
    amount: '$230.1',
    fullDate: 'June 20',
    formattedTime: '13:20pm',
  },
  {
    _id: '123-645',
    shortName: 'Burgers Mcdonalds',
    amount: '$75.00',
    fullDate: 'June 25',
    formattedTime: '16:22pm',
  },
  {
    _id: '321-456',
    shortName: 'Tacos arabes',
    amount: '$161.1',
    fullDate: 'June 17',
    formattedTime: '15:36pm',
  },
];
interface HeadCell {
  disablePadding: boolean;
  id: keyof ExpensePaidTable;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'shortName',
    numeric: false,
    disablePadding: false,
    label: 'Short Description',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'fullDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'formattedTime',
    numeric: false,
    disablePadding: false,
    label: 'Time',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ExpensePaidTable) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  } = props;
  const createSortHandler = (property: keyof ExpensePaidTable) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all expenses',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ExpensePaidTable>('amount');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      const newSelected = rows.map((n) => n.shortName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.shortName);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.shortName)}
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
                    height: (dense ? 33 : 53) * emptyRows,
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

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
      <EnhancedTable />
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
