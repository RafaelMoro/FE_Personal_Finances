import { ReactNode, useEffect, useState } from 'react';
import {
  Collapse, List,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListExpandableContainer } from '../../Records.styled';
import { Paragraph } from '../../../../../styles';

interface MonthAccordeonProps {
  opened?: boolean;
  children: ReactNode;
  title: string;
  backgroundColor: string;
  color: string;
  accountId: string;
  onClickCallback?: () => void;
}

const MonthAccordeon = ({
  opened = false, children, title, backgroundColor, color, onClickCallback = () => {}, accountId,
}: MonthAccordeonProps) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(opened);
  const iconSize = { fontSize: '2.5rem' };

  const open = () => setOpenCollapse(true);
  const close = () => setOpenCollapse(false);

  const handleClick = () => {
    if (!openCollapse) {
      open();
      onClickCallback();
      return;
    }
    close();
  };

  useEffect(() => {
    // Close the collapsable if we change to another account.
    if (openCollapse && !opened) {
      close();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  return (
    <>
      <ListExpandableContainer backgroundColor={backgroundColor} color={color} onClick={handleClick}>
        <Paragraph>{title}</Paragraph>
        {openCollapse ? <ExpandLess sx={iconSize} /> : <ExpandMore sx={iconSize} />}
      </ListExpandableContainer>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div">
          {children}
        </List>
      </Collapse>
    </>
  );
};

export { MonthAccordeon };
