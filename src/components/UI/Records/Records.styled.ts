import styled from '@emotion/styled';
import { blinkAnimation } from '../../../styles/animations/blink';
import {
  AppColors, Paragraph, Sub, ParagraphTitle,
} from '../../../styles';

export const RecordContainer = styled.article`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 70% 15% 15%;
  grid-template-rows: repeat(1, 1fr);
  row-gap: 1.5rem;
`;

export const RecordContainerMobile = styled.article`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  border-radius: 1rem;
  display: grid;
  row-gap: 1rem;
`;

export const RecordTitleMobile = styled(ParagraphTitle)`
  text-align: center;
`;

export const RecordDateTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
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

export const RecordDescription = styled(Paragraph)`
  color: ${AppColors.subtitleColor};
`;

export const RecordDateTime = styled(Sub)`
  opacity: 0.7;
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

export const BudgetChipContainer = styled.div`
  justify-self: center;
  display: flex;
  gap: 1rem;
`;

export const RecordSkeletonHolder = styled.div`
  width: 50%;
  height: 4rem;
  background-color: ${AppColors.grey};
  border-radius: 1rem;
  ${blinkAnimation}
`;
