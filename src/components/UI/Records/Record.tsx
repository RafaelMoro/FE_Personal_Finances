import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  ListItem, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';

import { windowSizeAtom } from '../../../atoms';
import { RecordProps } from './interface';
import {
  RecordContainer, RecordDescription, RecordDateTime, RecordContainerMobile,
  RecordTitleMobile, BudgetChipContainer, RecordCategory, RecordText,
  RecordSubCategory,
} from './Records.styled';
import {
  Chip, ParagraphTitle, Paragraph, FlexContainer,
} from '../../../styles';

const Record = ({
  _id, shortName, description, category, subCategory, tag = [],
  indebtedPeople = [], budgets = [], shortView = true,
  formattedTime, fullDate, children,
}: RecordProps) => {
  const [windowSize] = useAtom(windowSizeAtom);
  const [shortViewState, setShortViewState] = useState(shortView);
  const indebtedPeopleNames = indebtedPeople.map((person) => person.name);

  const toggleShortView = () => setShortViewState(!shortViewState);

  if (windowSize !== 'Mobile') {
    return (
      <ListItem button onClick={toggleShortView}>
        <RecordContainer>
          <ParagraphTitle>{ shortName }</ParagraphTitle>
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          <RecordCategory>{ category }</RecordCategory>
          <RecordSubCategory>{ subCategory }</RecordSubCategory>
          <RecordDescription>{ description }</RecordDescription>
          <BudgetChipContainer>
            { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
            { budgets.length > 0 && budgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" color="primary" />
            ))}
          </BudgetChipContainer>
          <BudgetChipContainer>
            { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
            { tag.length > 0 && tag.map((item) => (
              <Chip key={`${_id}-${item}`} label={item} variant="outlined" color="primary" />
            ))}
          </BudgetChipContainer>
          { children }
          { (indebtedPeople.length > 0 && shortViewState) && (
          <Paragraph>
            People who owe you money:
            {' '}
            {
              indebtedPeopleNames.map((personName) => (`${personName} - `))
            }
          </Paragraph>
          ) }
          { (indebtedPeople.length > 0 && !shortViewState) && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>Amount:</TableCell>
                <TableCell>Amount Paid:</TableCell>
                <TableCell>Resting Debt:</TableCell>
                <TableCell>The debt is completely paid:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { indebtedPeople.map((person, index) => (
                <TableRow key={`${person.name}-${index + 1}`}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.amount}</TableCell>
                  <TableCell>{person.amountPaid}</TableCell>
                  <TableCell>{person.amount - person.amountPaid}</TableCell>
                  <TableCell>{person.isPaid ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
          ) }
        </RecordContainer>
      </ListItem>
    );
  }

  return (
    <ListItem button onClick={toggleShortView}>
      <RecordContainerMobile>
        <RecordTitleMobile>{ shortName }</RecordTitleMobile>
        <FlexContainer justifyContent="center" gap="1">
          <RecordDateTime>{ fullDate }</RecordDateTime>
          <RecordDateTime>{ formattedTime }</RecordDateTime>
          <RecordText>{ category }</RecordText>
          <RecordText>{ subCategory }</RecordText>
        </FlexContainer>
        <FlexContainer justifyContent="center" gap="1">
          <BudgetChipContainer>
            { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
            { budgets.length > 0 && budgets.map((budget) => (
              <Chip key={`${_id}-${budget}`} label={budget} variant="outlined" color="primary" />
            ))}
          </BudgetChipContainer>
          <BudgetChipContainer>
            { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
            { tag.length > 0 && tag.map((item) => (
              <Chip key={`${_id}-${item}`} label={item} variant="outlined" color="primary" />
            ))}
          </BudgetChipContainer>
        </FlexContainer>
        <RecordText>{ description }</RecordText>
        { children }
        { (indebtedPeople.length > 0 && shortViewState) && (
          <Paragraph>
            People who owe you money:
            {' '}
            {
              indebtedPeopleNames.map((personName) => (`${personName} - `))
            }
          </Paragraph>
        ) }
        { (indebtedPeople.length > 0 && !shortViewState) && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>Amount:</TableCell>
                <TableCell>Amount Paid:</TableCell>
                <TableCell>Resting Debt:</TableCell>
                <TableCell>The debt is completely paid:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { indebtedPeople.map((person, index) => (
                <TableRow key={`${person.name}-${index + 1}`}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.amount}</TableCell>
                  <TableCell>{person.amountPaid}</TableCell>
                  <TableCell>{person.amount - person.amountPaid}</TableCell>
                  <TableCell>{person.isPaid ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        ) }
      </RecordContainerMobile>
    </ListItem>
  );
};

export { Record };
