import styled from '@emotion/styled';
import { AppColors, Paragraph, Sub } from '../../../styles';

export const RecordContainer = styled.article`
  width: 100%;
  height: 100px;
  padding: 1rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 70% 15% 15%;
  grid-template-rows: repeat(1, 1fr);
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

export const RecordExpense = styled(Paragraph)`
  font-weight: 500;
  color: ${AppColors.negative};
`;
