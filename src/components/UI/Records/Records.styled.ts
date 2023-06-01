import styled from '@emotion/styled';
import { List as ListMUI, Table } from '@mui/material';
import { blinkAnimation } from '../../../styles/animations/blink';
import {
  AppColors, Paragraph, Sub, ParagraphTitle, TableCell,
} from '../../../styles';

export const RecordContainer = styled.article`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 70% 15% 15%;
  grid-template-rows: repeat(1, 1fr);
  row-gap: 1.5rem;
`;

export const RecordDateTime = styled(Sub)`
  opacity: 0.7;
`;

export const RecordText = styled(Paragraph)`
  color: ${AppColors.subtitleColor};
`;

export const RecordCategory = styled(RecordText)`
  grid-column: 2 / 3;
`;

export const RecordSubCategory = styled(RecordText)`
  grid-column: 3 / 4;
`;

export const BudgetChipContainer = styled.div`
  justify-self: start;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  gap: 1rem;
`;

// Mobile

export const RecordContainerMobile = styled.article`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: grid;
  row-gap: 1rem;
`;

export const RecordTitleMobile = styled(ParagraphTitle)`
  text-align: center;
`;

export const RecordSkeletonContainer = styled(RecordContainer)`
  border: 1px solid grey;
`;

export const ExpensesPayed = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Expense = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const RecordIncome = styled(Paragraph)`
  font-weight: 500;
  color: ${AppColors.positive};
`;

export const RecordIncomeMobile = styled(RecordIncome)`
  text-align: center;
`;

export const RecordExpense = styled(Paragraph)`
  font-weight: 500;
  color: ${AppColors.negative};
`;

export const RecordExpenseMobile = styled(RecordExpense)`
  text-align: center;
`;

export const RecordSkeletonHolder = styled.div`
  width: 50%;
  height: 4rem;
  background-color: ${AppColors.grey};
  border-radius: 1rem;
  ${blinkAnimation}
`;

// Record Drawer

export const RecordDrawerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
  justify-content: center;
  gap: 1rem;
`;

export const RecordDrawerTitle = styled(ParagraphTitle)`
  text-align: center;
  grid-column: 1 / 3;
`;

export const RecordDrawerDatetime = styled(RecordDateTime)`
  text-align: center;
`;

export const RecordDrawerText = styled(RecordText)`
  text-align: center;
`;

export const RecordDrawerDescription = styled(RecordText)`
  grid-column: 1 / 3;
`;

export const TableTitle = styled(Paragraph)`
  grid-column: 1 / 3;
  text-align: center;
`;

export const RecordDrawerPriceContainer = styled.div`
  text-align: center;
  grid-column: 1 / 3;
`;

export const RecordTable = styled(Table)`
  grid-column: 1 / 3;
`;

export const DebtPaid = styled(TableCell)`
  color: ${AppColors.subtitleColor};
  text-decoration: line-through;
`;

// Record List

export const List = styled(ListMUI)`
  margin-top: 1.5rem;
`;
