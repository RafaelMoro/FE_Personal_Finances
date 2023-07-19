import {
  TableHead, TableRow, Checkbox, TableSortLabel, Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { EnhancedTableProps, ExpensePaidTable, HeadCell } from './interface';
import { TableCell } from '../../../../../styles';

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

function EnhancedTableHead({
  onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
}: EnhancedTableProps) {
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

export { EnhancedTableHead };
