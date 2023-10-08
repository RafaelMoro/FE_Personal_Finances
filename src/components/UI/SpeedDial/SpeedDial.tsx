import { useState } from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { SpeedDialAction } from '@mui/material';

import { SpeedDialProps } from './interface';
import { SpeedDialComponent } from '../../../styles';
import { SpeedDialContainer } from './SpeedDial.styled';

const SpeedDial = ({ actions, ariaLabelDescription }: SpeedDialProps) => {
  const [open, setOpen] = useState(false);

  const toggleDial = () => setOpen(!open);

  return (
    <SpeedDialContainer>
      <SpeedDialComponent
        ariaLabel={ariaLabelDescription}
        icon={<SpeedDialIcon />}
        onClick={toggleDial}
        open={open}
      >
        { (actions.length > 0) && actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              toggleDial();
              action.actionCallback();
            }}
          />
        )) }
      </SpeedDialComponent>
    </SpeedDialContainer>
  );
};

export { SpeedDial };
