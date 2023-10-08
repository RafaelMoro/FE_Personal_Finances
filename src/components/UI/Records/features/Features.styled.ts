import styled from '@emotion/styled';
import { AppColors, Paragraph, TableCell } from '../../../../styles';

/** SelectExpenses */
export const SelectExpensesContainer = styled.div`
  padding-top: 3rem;
  display: grid;
  justify-content: center;
  gap: 2rem;
  min-width: 77rem;
  width: 100%;
`;

/** MonthRecords */
export const ShowTotalContianer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

/** ShowIndebtedPeople */

export const DebtPaid = styled(TableCell)`
  color: ${AppColors.subtitleColor};
  text-decoration: line-through;
`;

export const NameCellTitle = styled(TableCell)`
  padding: 1.6rem 0;
  text-align: center;
`;

export const NameCell = styled(TableCell)`
  padding: 1.6rem 0;
  display: grid;
  gap: 1rem;
`;

export const IndebtedPeopleName = styled(Paragraph)`
  padding: 1rem 0;
  text-align: center;
`;

export const IconsCell = styled(TableCell)`
  display: flex;
`;

export const IndebtedPersonName = styled(Paragraph)`
  grid-column: 1 / 3;
  text-align: center;
`;
