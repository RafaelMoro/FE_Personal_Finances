import { ReactNode, useState } from 'react';
import {
  Collapse, List,
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
  onClickCallback?: () => void;
}

const MonthRecords = ({
  opened = false, children, title, backgroundColor, color, onClickCallback = () => {},
}: MonthRecordsProps) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(opened);
  const iconSize = { fontSize: '2.5rem' };

  const toggleOpenCollapse = () => setOpenCollapse(!openCollapse);
  const handleClick = () => {
    toggleOpenCollapse();
    onClickCallback();
  };

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

export { MonthRecords };
