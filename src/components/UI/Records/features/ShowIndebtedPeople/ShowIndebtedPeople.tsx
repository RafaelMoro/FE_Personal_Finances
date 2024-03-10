import { useMemo } from 'react';
import {
  TableHead, TableRow, TableBody, IconButton,
} from '@mui/material';

import { ShowIndebtedPeopleProps } from './interface';
import { useAppSelector } from '../../../../../redux/hooks';
import { formatIndebtedPeople } from '../../../../../utils/formatIndebtedPeople';
import { AppIcon } from '../../../Icons';
import { AppColors, FlexContainer, TableCell } from '../../../../../styles';
import {
  TableTitle, RecordTable, TableNote,
} from '../RecordDrawer/RecordDrawer.styled';
import {
  IconsCell, IndebtedPeopleName, NameCell, NameCellTitle, DebtPaid, IndebtedTableCell,
} from '../Features.styled';

const ShowIndebtedPeople = ({
  indebtedPeople,
  inRecordDrawer = false,
  deleteIndebtedPerson = () => {},
  modifyIndebtedPerson = () => {},
}: ShowIndebtedPeopleProps) => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const formattedIndebtedPeople = useMemo(() => formatIndebtedPeople(indebtedPeople), [indebtedPeople]);

  return (
    <>
      { (!inRecordDrawer) && (
        <TableNote variant="body2">
          Note: If you are going to buy something with someone else, you may add how many does this person will owe you on this section.
          If so, click on &quot; Add Person &quot;
        </TableNote>
      ) }
      <TableTitle align="center" isGrid={inRecordDrawer}>
        People related to this transaction:
        {' '}
        {indebtedPeople.length}
      </TableTitle>
      { (indebtedPeople.length > 0) && (
        <RecordTable isGrid={inRecordDrawer}>
          <TableHead>
            <TableRow>
              <NameCellTitle>Name:</NameCellTitle>
              <IndebtedTableCell>Amount:</IndebtedTableCell>
              <IndebtedTableCell>Amount Paid:</IndebtedTableCell>
              <IndebtedTableCell>Resting Debt:</IndebtedTableCell>
              { /** Show the extra column Actions if we are not in mobile */ }
              { (windowSize !== 'Mobile' && !inRecordDrawer) && (<TableCell>Actions:</TableCell>) }
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
                        <IconsCell>
                          <IconButton onClick={() => modifyIndebtedPerson(person.name)}>
                            <AppIcon icon="Edit" fillColor={AppColors.primary} />
                          </IconButton>
                          <IconButton onClick={() => deleteIndebtedPerson(person.name)}>
                            <AppIcon icon="Delete" fillColor={AppColors.negative} />
                          </IconButton>
                        </IconsCell>
                      ) }
                    </>
                  )
                  : (
                    <>
                      { (windowSize !== 'Mobile') && (<TableCell>{person.name}</TableCell>) }
                      { (windowSize === 'Mobile' && !inRecordDrawer) && (
                        <NameCell>
                          <IndebtedPeopleName>{person.name}</IndebtedPeopleName>
                          <FlexContainer>
                            <IconButton onClick={() => modifyIndebtedPerson(person.name)}>
                              <AppIcon icon="Edit" fillColor={AppColors.primary} />
                            </IconButton>
                            <IconButton onClick={() => deleteIndebtedPerson(person.name)}>
                              <AppIcon icon="Delete" fillColor={AppColors.negative} />
                            </IconButton>
                          </FlexContainer>
                        </NameCell>
                      ) }
                      <TableCell>{person.amount}</TableCell>
                      <TableCell>{person.amountPaid}</TableCell>
                      <TableCell>{person.restingDebt}</TableCell>
                      { (windowSize !== 'Mobile' && !inRecordDrawer) && (
                      <IconsCell>
                        <IconButton onClick={() => modifyIndebtedPerson(person.name)}>
                          <AppIcon icon="Edit" fillColor={AppColors.primary} />
                        </IconButton>
                        <IconButton onClick={() => deleteIndebtedPerson(person.name)}>
                          <AppIcon icon="Delete" fillColor={AppColors.negative} />
                        </IconButton>
                      </IconsCell>
                      ) }
                    </>
                  ) }
              </TableRow>
            )) }
          </TableBody>
        </RecordTable>
      ) }
    </>
  );
};

export { ShowIndebtedPeople };
