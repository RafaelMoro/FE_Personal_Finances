import styled from '@emotion/styled';
import { Toolbar, Typography } from '@mui/material';

import {
  AppColors, Sub, TableCell,
} from '../../../../styles';

/** SelectExpenses */
export const SelectExpensesContainer = styled.div`
  padding: 3rem 1rem 1rem 1rem;
  display: grid;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  min-width: 32rem;

  @media(min-width: 480px) {
    min-width: 48rem;
  }

  @media(min-width: 1024px) {
    min-width: 70rem;
  }
`;

export const CloseDrawerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const LoadingExpensesContainer = styled.div`
  width: 100%;
  min-width: 32rem;
  display: grid;
  gap: 1rem;
  place-items: center;
  padding-top: 3rem;

  @media(min-width: 480px) {
    min-width: 48rem;
  }

  @media(min-width: 1024px) {
    min-width: 70rem;
  }
`;

export const ExpensesNotFoundContainer = styled.div`
  padding-top: 3rem;

  @media(min-width: 480px) {
    min-width: 77rem;
  }
`;

export const SideNoteSelectExpense = styled(Sub)`
  color: ${AppColors.subtitleColor};
`;

export const SelectExpensesToolbar = styled(Toolbar)`
  padding: 2rem 0;
  display: grid;
  gap: 1rem;
`;

/** SelectExpensesTable */
export const SelectMonthYearBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;

  @media(min-width: 480px) {
    flex-direction: row;
    justify-content: center;
    gap: 5rem;
    margin-top: 2rem;
  }
`;

export const SelectExpensesCell = styled(TableCell)`
  padding: 1.5rem 1rem 1.5rem 0;
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

export const IndebtedPeopleName = styled(Typography)`
  padding: 1rem 0;
  text-align: center;
`;

export const IconsCell = styled(TableCell)`
  display: flex;
`;

export const IndebtedPersonName = styled(Typography)`
  grid-column: 1 / 3;
  text-align: center;
`;

/** No records found */

export const NoRecordsFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 4rem;
`;
