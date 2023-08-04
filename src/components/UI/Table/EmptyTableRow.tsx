import { TableRow } from '@mui/material';
import { TableCell } from '../../../styles';

interface EmptyTableRowProps {
  emptyRows: number;
  colSpan: number;
}

const EmptyTableRow = ({ emptyRows, colSpan }: EmptyTableRowProps) => (
  <TableRow
    style={{
      height: 53 * emptyRows,
    }}
  >
    <TableCell colSpan={colSpan} />
  </TableRow>
);

export { EmptyTableRow };
