import { useState } from 'react';
import {
  FileCopy, AddCard, AdfScanner,
} from '@mui/icons-material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { SpeedDialAction } from '@mui/material';
import { SpeedDialComponent } from '../../../styles';
import { SpeedDialContainer } from './SpeedDial.styled';

const actions = [
  { icon: <FileCopy />, name: 'Copy' },
  { icon: <AddCard />, name: 'Save' },
  { icon: <AdfScanner />, name: 'Print' },
];

const SpeedDial = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDialContainer>
      <SpeedDialComponent
        ariaLabel="SpeedDial Accounts and Records actions"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        { actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        )) }
      </SpeedDialComponent>
    </SpeedDialContainer>
  );
};

export { SpeedDial };
