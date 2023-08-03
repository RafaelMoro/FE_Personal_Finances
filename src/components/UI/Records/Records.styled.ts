import styled from '@emotion/styled';
import { List as ListMUI, Table } from '@mui/material';

import { DrawerChipContainerProps, RecordTableProps } from './interface';
import { blinkAnimation } from '../../../styles/animations/blink';
import {
  AppColors, Paragraph, Sub, ParagraphTitle, TableCell,
} from '../../../styles';

export const RecordContainer = styled.article`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 60% 20% 20%;
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

export const ChipContainerMobile = styled.div`
  justify-self: start;
  width: 100%;
  display: grid;
  gap: 1rem;
`;

export const ChipContainer = styled(ChipContainerMobile)`
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-rows: minmax(3.2rem, auto);
`;

export const DrawerChipContainer = styled(ChipContainerMobile)`
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  border: 0.1rem solid ${AppColors.bgColorGrey};
  padding: 1.5rem;
  border-radius: 1rem;

  &:after {
    content: '${(props: DrawerChipContainerProps) => props.afterContent}';
    position: absolute;
    top: -1rem;
    left: 1.6rem;
    bottom: 0;
    right: 0;
    height: 1rem;
    width: 6rem;
    background-color: white;
    font-size: 1.5rem;
    color: ${AppColors.grey};
  }
`;

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

export const TableTitle = styled(Paragraph, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${({ isGrid = false }: RecordTableProps) => (isGrid && 'grid-column: 1 / 3;')}
  text-align: center;
`;

export const RecordDrawerPriceContainer = styled.div`
  text-align: center;
  grid-column: 1 / 3;
`;

export const RecordTable = styled(Table, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${(props: RecordTableProps) => (props.isGrid && 'grid-column: 1 / 3;')}
`;

export const DebtPaid = styled(TableCell)`
  color: ${AppColors.subtitleColor};
  text-decoration: line-through;
`;

// Record List

export const List = styled(ListMUI)`
  margin-top: 1.5rem;
`;

// Categories and subcategories

export const RecordLoaderContainer = styled.div`
  margin: 0 auto;
`;

export const LoadingCategoriesContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
`;

// Show expenses

export const SelectExpensesContainer = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-content: center;
`;
