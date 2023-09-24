import styled from '@emotion/styled';
import { ListItemButton, List as ListMUI, Table } from '@mui/material';

import { DrawerChipContainerProps, ListExpandableContainerProps, RecordTableProps } from './interface';
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

export const RecordLoadingBox = styled.div`
  display: grid;
  gap: 2rem;
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
  padding: 2rem;
  justify-content: center;
  gap: 1rem;
`;

export const DrawerTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  grid-column: 1 / 3;
`;

export const DrawerCloseBox = styled.div`
  cursor: pointer;
  grid-column: 2 / 3;
  justify-self: end;
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

export const LoaderContainer = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  gap: 1rem;
`;

export const List = styled(ListMUI)`
  margin-top: 1.5rem;
  display: grid;
  gap: 2rem;
`;

export const MonthRecordBox = styled.div`
  height: 100%;
  max-height: 80rem;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;
`;

// Categories and subcategories

export const RecordLoaderContainer = styled.div`
  margin: 0 auto;
`;

export const LoadingCategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 2rem;
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

// Select Expenses
export const SelectMonthYearBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  margin-top: 2rem;
`;

// Month Records

export const ListExpandableContainer = styled(ListItemButton, { shouldForwardProp: (props) => props !== 'backgroundColor' && props !== 'color' })`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border: .1rem solid ${AppColors.white};
  border-radius: 1rem;
  background-color: ${({ backgroundColor }: ListExpandableContainerProps) => backgroundColor};
  color: ${({ color }: ListExpandableContainerProps) => color};

  &:hover {
    background-color: ${AppColors.bgColorGrey};
    color: ${AppColors.black};
  }
`;
