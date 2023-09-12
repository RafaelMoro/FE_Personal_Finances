import { useMemo } from 'react';
import {
  TableHead, TableRow, TableBody, IconButton,
} from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';

import { ShowIndebtedPeopleProps } from './interface';
import { formatIndebtedPeople } from '../../../../../utils/formatIndebtedPeople';
import { TableCell, AppColors } from '../../../../../styles';
import { DebtPaid, TableTitle, RecordTable } from '../../Records.styled';

const ShowIndebtedPeople = ({
  indebtedPeople,
  inRecordDrawer = false,
  deleteIndebtedPerson = () => {},
  modifyIndebtedPerson = () => {},
}: ShowIndebtedPeopleProps) => {
  const formattedIndebtedPeople = useMemo(() => formatIndebtedPeople(indebtedPeople), [indebtedPeople]);

  return (
    <>
      <TableTitle isGrid={inRecordDrawer}>People related to this transaction: </TableTitle>
      <RecordTable isGrid={inRecordDrawer}>
        <TableHead>
          <TableRow>
            <TableCell>Name:</TableCell>
            <TableCell>Amount:</TableCell>
            <TableCell>Amount Paid:</TableCell>
            <TableCell>Resting Debt:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { indebtedPeople.length > 0 && formattedIndebtedPeople.map((person, index) => (
            <TableRow key={`${person.name}-${index + 1}`}>
              { (person.isPaid)
                ? (
                  <>
                    <DebtPaid>{person.name}</DebtPaid>
                    <DebtPaid>{person.amount}</DebtPaid>
                    { (!inRecordDrawer) && (
                      <DebtPaid>
                        <IconButton onClick={() => modifyIndebtedPerson(person.name)}>
                          <EditOutlined sx={{ fontSize: '2.5rem', fill: AppColors.primary }} />
                        </IconButton>
                        <IconButton onClick={() => deleteIndebtedPerson(person.name)}>
                          <DeleteOutlined sx={{ fontSize: '2.5rem', fill: AppColors.negative }} />
                        </IconButton>
                      </DebtPaid>
                    )}
                  </>
                )
                : (
                  <>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.amount}</TableCell>
                    <TableCell>{person.amountPaid}</TableCell>
                    <TableCell>{person.restingDebt}</TableCell>
                    { (!inRecordDrawer) && (
                      <TableCell>
                        <IconButton onClick={() => modifyIndebtedPerson(person.name)}>
                          <EditOutlined sx={{ fontSize: '2.5rem', fill: AppColors.primary }} />
                        </IconButton>
                        <IconButton onClick={() => deleteIndebtedPerson(person.name)}>
                          <DeleteOutlined sx={{ fontSize: '2.5rem', fill: AppColors.negative }} />
                        </IconButton>
                      </TableCell>
                    ) }
                  </>
                ) }
            </TableRow>
          )) }
        </TableBody>
      </RecordTable>
    </>
  );
};

export { ShowIndebtedPeople };
