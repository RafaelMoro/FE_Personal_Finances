import { ReactNode, useState } from 'react';
import {
  Collapse, List, ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface MonthRecordsProps {
  opened?: boolean;
  children: ReactNode;
  title: string;
}

const MonthRecords = ({ opened = false, children, title }: MonthRecordsProps) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(opened);

  const toggleOpenCollapse = () => setOpenCollapse(!openCollapse);

  return (
    <>
      <ListItemButton onClick={toggleOpenCollapse}>
        { title }
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div">
          {children}
        </List>
      </Collapse>
    </>
  );
};

export { MonthRecords };
