import { alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';

import { EnhancedTableToolbarProps } from './interface';
import { SelectExpensesToolbar } from '../Features.styled';

function EnhancedTableToolbar({ numSelected }: EnhancedTableToolbarProps) {
  return (
    <SelectExpensesToolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <>
        <Typography variant="body2">
          Note: If you cannot find your expense, it may be under other account or a different month.
        </Typography>
        <Typography
          id="tableTitle"
        >
          Select the expenses:
        </Typography>
        { (numSelected > 0) && (
        <Typography>
          {numSelected}
          {' '}
          selected
        </Typography>
        ) }
      </>
    </SelectExpensesToolbar>
  );
}

export { EnhancedTableToolbar };
