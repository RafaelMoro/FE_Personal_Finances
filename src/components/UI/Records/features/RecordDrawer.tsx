import {
  TableHead, TableRow, TableBody,
} from '@mui/material';

import { RecordDrawerProps } from '../interface';
import {
  RecordDrawerContainer, RecordDrawerTitle, RecordDrawerDatetime, RecordDrawerText,
  RecordDrawerDescription, RecordTable, DrawerChipContainer,
  TableTitle, RecordDrawerPriceContainer,
} from '../Records.styled';
import { TableCell, Chip } from '../../../../styles';
import { ShowIndebtedPeople } from './ShowIndebtedPeople/ShowIndebtedPeople';

const RecordDrawer = ({
  shortName, description, fullDate, formattedTime, expensesPaid,
  category, subCategory, tag, indebtedPeople, budgets, amountShown,
}: RecordDrawerProps) => (
  <RecordDrawerContainer>
    <RecordDrawerTitle>{shortName}</RecordDrawerTitle>
    <RecordDrawerDatetime>{fullDate}</RecordDrawerDatetime>
    <RecordDrawerDatetime>{formattedTime}</RecordDrawerDatetime>
    <RecordDrawerText>{category.categoryName}</RecordDrawerText>
    <RecordDrawerText>{subCategory}</RecordDrawerText>
    <RecordDrawerPriceContainer>
      { amountShown }
    </RecordDrawerPriceContainer>
    <DrawerChipContainer afterContent="Budgets">
      { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
      { budgets.length > 0 && budgets.map((budget, index) => (
        <Chip key={`${index + 1}-${budget}`} label={budget} variant="outlined" color="primary" />
      ))}
    </DrawerChipContainer>
    <DrawerChipContainer afterContent="Tags">
      { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
      { tag.length > 0 && tag.map((item, index) => (
        <Chip key={`${index + 1}-${item}`} label={item} variant="outlined" color="primary" />
      ))}
    </DrawerChipContainer>
    <RecordDrawerDescription>{description}</RecordDrawerDescription>
    { (indebtedPeople.length > 0) && (
    <ShowIndebtedPeople indebtedPeople={indebtedPeople} inRecordDrawer />
    ) }
    { (expensesPaid.length > 0) && (
    <>
      <TableTitle isGrid>Expenses Paid:</TableTitle>
      <RecordTable isGrid>
        <TableHead>
          <TableRow>
            <TableCell>Name:</TableCell>
            <TableCell>Date:</TableCell>
            <TableCell>Time:</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { expensesPaid.map((expense, index) => (
            <TableRow key={`${expense._id}-${index + 1}`}>
              <TableCell>{expense.shortName}</TableCell>
              <TableCell>{expense.fullDate}</TableCell>
              <TableCell>{expense.formattedTime}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </RecordTable>
    </>
    ) }
  </RecordDrawerContainer>
);

export { RecordDrawer };
