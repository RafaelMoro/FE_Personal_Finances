import { Toolbar } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { EnhancedTableToolbarProps } from './interface';
import { Paragraph } from '../../../../../styles';

function EnhancedTableToolbar({ numSelected }: EnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Paragraph>
          {numSelected}
          {' '}
          selected
        </Paragraph>
      ) : (
        <Paragraph
          id="tableTitle"
        >
          Select the expenses:
        </Paragraph>
      )}
    </Toolbar>
  );
}

export { EnhancedTableToolbar };
