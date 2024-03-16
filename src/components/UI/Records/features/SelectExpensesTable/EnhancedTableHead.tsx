import {
  TableHead, TableRow, Checkbox, TableSortLabel, Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { EnhancedTableProps, ExpensePaidTable, HeadCell } from './interface';
import { TableCell } from '../../../../../styles';
import { SelectExpensesCell } from '../Features.styled';
import { useAppSelector } from '../../../../../redux/hooks';

const headCellsDesktop: readonly HeadCell[] = [
  {
    id: 'shortName',
    numeric: false,
    disablePadding: false,
    label: 'Short Description',
  },
  {
    id: 'amountFormatted',
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
    id: 'isPaid',
    numeric: false,
    disablePadding: false,
    label: 'Paid',
  },
];

const headCellsMobile: readonly HeadCell[] = [
  {
    id: 'shortName',
    numeric: false,
    disablePadding: false,
    label: 'Short Description',
  },
  {
    id: 'amountFormatted',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'isPaid',
    numeric: false,
    disablePadding: false,
    label: 'Paid',
  },
];

function EnhancedTableHead({
  onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
}: EnhancedTableProps) {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const headCells = isMobile ? headCellsMobile : headCellsDesktop;
  const createSortHandler = (property: keyof ExpensePaidTable) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all expenses',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <SelectExpensesCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.id === 'isPaid' || headCell.id === 'fullDate' ? 'right' : 'left'}
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
          </SelectExpensesCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export { EnhancedTableHead };
