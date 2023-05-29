import {
  TableHead, TableRow, TableBody,
} from '@mui/material';
import { RecordDrawerProps } from '../interface';
import {
  RecordDrawerContainer, RecordDrawerTitle, RecordDrawerDatetime, RecordDrawerText,
  RecordDrawerDescription, RecordTable, BudgetChipContainer, DebtPaid,
} from '../Records.styled';
import { TableCell, Chip } from '../../../../styles';
import { formatNumberToCurrency } from '../../../../utils';

const RecordDrawer = ({
  shortName, description, fullDate, formattedTime,
  category, subCategory, tag, indebtedPeople, budgets,
}: RecordDrawerProps) => {
  const formattedIndebtedPeople = indebtedPeople.map((person) => ({
    ...person,
    amount: formatNumberToCurrency(person.amount),
    amountPaid: formatNumberToCurrency(person.amountPaid),
    restingDebt: formatNumberToCurrency(person.amount - person.amountPaid),
  }));

  return (
    <RecordDrawerContainer>
      <RecordDrawerTitle>{shortName}</RecordDrawerTitle>
      <RecordDrawerDatetime>{fullDate}</RecordDrawerDatetime>
      <RecordDrawerDatetime>{formattedTime}</RecordDrawerDatetime>
      <RecordDrawerText>{category}</RecordDrawerText>
      <RecordDrawerText>{subCategory}</RecordDrawerText>
      <BudgetChipContainer>
        { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
        { budgets.length > 0 && budgets.map((budget, index) => (
          <Chip key={`${index + 1}-${budget}`} label={budget} variant="outlined" color="primary" />
        ))}
      </BudgetChipContainer>
      <BudgetChipContainer>
        { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
        { tag.length > 0 && tag.map((item, index) => (
          <Chip key={`${index + 1}-${item}`} label={item} variant="outlined" color="primary" />
        ))}
      </BudgetChipContainer>
      <RecordDrawerDescription>{description}</RecordDrawerDescription>
      { (indebtedPeople.length > 0) && (
      <RecordTable>
        <TableHead>
          <TableRow>
            <TableCell>Name:</TableCell>
            <TableCell>Amount:</TableCell>
            <TableCell>Amount Paid:</TableCell>
            <TableCell>Resting Debt:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { formattedIndebtedPeople.map((person, index) => (
            <TableRow key={`${person.name}-${index + 1}`}>
              { (person.isPaid)
                ? (
                  <>
                    <DebtPaid>{person.name}</DebtPaid>
                    <DebtPaid>{person.amount}</DebtPaid>
                  </>
                )
                : (
                  <>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.amount}</TableCell>
                    <TableCell>{person.amountPaid}</TableCell>
                    <TableCell>{person.restingDebt}</TableCell>
                  </>
                ) }
            </TableRow>
          )) }
        </TableBody>
      </RecordTable>
      ) }
    </RecordDrawerContainer>
  );
};

export { RecordDrawer };
