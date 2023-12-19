import { alpha } from '@mui/material/styles';

import { EnhancedTableToolbarProps } from './interface';
import { SelectExpensesToolbar, SideNoteSelectExpense } from '../Features.styled';
import { Paragraph } from '../../../../../styles';

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
        <Paragraph
          id="tableTitle"
        >
          Select the expenses:
        </Paragraph>
        { (numSelected > 0) && (
        <Paragraph>
          {numSelected}
          {' '}
          selected
        </Paragraph>
        ) }
      </>
    </SelectExpensesToolbar>
  );
}

export { EnhancedTableToolbar };
