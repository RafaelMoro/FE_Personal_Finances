import { useState } from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { SpeedDialAction } from '@mui/material';

import { SpeedDialProps } from './interface';
import { SpeedDialComponent } from '../../../styles';
import { SpeedDialContainer } from './SpeedDial.styled';

const SpeedDial = ({ actions, ariaLabelDescription }: SpeedDialProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDialContainer>
      <SpeedDialComponent
        ariaLabel={ariaLabelDescription}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        { (actions.length > 0) && actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose();
              action.actionCallback();
            }}
          />
        )) }
      </SpeedDialComponent>
    </SpeedDialContainer>
  );
};

export { SpeedDial };
