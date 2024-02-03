import { alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';

import { EnhancedTableToolbarProps } from './interface';
import { SelectExpensesToolbar, SideNoteSelectExpense } from '../Features.styled';

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
        <SideNoteSelectExpense>
          Note: If you cannot find your expense, it may be under other account or a different month.
        </SideNoteSelectExpense>
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
