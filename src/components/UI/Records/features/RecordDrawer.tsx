import {
  Table, TableHead, TableRow, TableBody,
} from '@mui/material';
import { RecordDrawerProps } from '../interface';
import { ParagraphTitle, Paragraph, TableCell } from '../../../../styles';

const RecordDrawer = ({
  shortName, description, fullDate, formattedTime,
  category, subCategory, tag, indebtedPeople, budgets,
}: RecordDrawerProps) => (
  <div>
    <ParagraphTitle>{shortName}</ParagraphTitle>
    <Paragraph>{fullDate}</Paragraph>
    <Paragraph>{formattedTime}</Paragraph>
    <Paragraph>{category}</Paragraph>
    <Paragraph>{subCategory}</Paragraph>
    <Paragraph>{subCategory}</Paragraph>
    <Paragraph>{subCategory}</Paragraph>
    <Paragraph>{description}</Paragraph>
    { (indebtedPeople.length > 0) && (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name:</TableCell>
          <TableCell>Amount:</TableCell>
          <TableCell>Amount Paid:</TableCell>
          <TableCell>Resting Debt:</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { indebtedPeople.map((person, index) => (
          <TableRow key={`${person.name}-${index + 1}`}>
            <TableCell>{person.name}</TableCell>
            { (person.isPaid)
              ? (
                <>
                  <TableCell>{person.amount}</TableCell>
                  <TableCell>Debt paid</TableCell>
                </>
              )
              : (
                <>
                  <TableCell>{person.amount}</TableCell>
                  <TableCell>{person.amountPaid}</TableCell>
                  <TableCell>{person.amount - person.amountPaid}</TableCell>
                </>
              ) }
          </TableRow>
        )) }
      </TableBody>
    </Table>
    ) }
  </div>
);

export { RecordDrawer };
