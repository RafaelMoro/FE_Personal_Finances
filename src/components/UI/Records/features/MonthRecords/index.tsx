import { ReactNode, useState } from 'react';
import {
  Collapse, List, ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListExpandableContainer } from '../../Records.styled';
import { Paragraph } from '../../../../../styles';

interface MonthRecordsProps {
  opened?: boolean;
  children: ReactNode;
  title: string;
  backgroundColor: string;
  color: string;
}

const MonthRecords = ({
  opened = false, children, title, backgroundColor, color,
}: MonthRecordsProps) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(opened);
  const iconSize = { fontSize: '2.5rem' };

  const toggleOpenCollapse = () => setOpenCollapse(!openCollapse);

  return (
    <>
      <ListExpandableContainer backgroundColor={backgroundColor} color={color} onClick={toggleOpenCollapse}>
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

export { MonthRecords };
