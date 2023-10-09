import styled from '@emotion/styled';
import {
  ListItem, ListItemButton, List as ListMUI, Table,
} from '@mui/material';

import {
  DrawerChipContainerProps, ListExpandableContainerProps, RecordStatusProps, RecordTableProps,
} from './interface';
import { blinkAnimation } from '../../../styles/animations/blink';
import {
  AppColors, Paragraph, Sub, ParagraphTitle,
} from '../../../styles';

export const ListItemRecord = styled(ListItem)`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;
  cursor: pointer;

  @media(min-width: 480px) {
    grid-template-columns: 50% 25% 25%;
    column-gap: 1rem;
  }

  @media(min-width: 1024px) {
    grid-template-columns: 60% 20% 20%;
    column-gap: 0;
  }
`;

export const RecordTitle = styled(ParagraphTitle)`
  grid-column: 1 / 3;

  @media(min-width: 480px) {
    grid-column: 1 / 4;
  }

  @media(min-width: 1024px) {
    text-align: start;
    grid-column: 1 / 2;
  }
`;

export const RecordDateTime = styled(Sub)`
  opacity: 0.7;
  text-align: center;
`;

export const RecordDate = styled(RecordDateTime)`
  @media(min-width: 480px) {
    grid-column: 2 / 3;
    text-align: start;
  }

  @media(min-width: 1024px) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
`;

export const RecordTime = styled(RecordDateTime)`
  @media(min-width: 480px) {
    grid-column: 3 / 4;
    text-align: start;
  }

  @media(min-width: 1024px) {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }
`;

export const RecordPrice = styled(Paragraph)`
  font-weight: 500;
  text-align: center;
  grid-column: 1 / 3;

  @media(min-width: 480px) {
    grid-column: 1 / 2;
  }

  @media(min-width: 1024px) {
    text-align: start;
  }
`;

export const RecordIncome = styled(RecordPrice)`
  color: ${AppColors.positive};
`;

export const RecordExpense = styled(RecordPrice)`
  color: ${AppColors.negative};
`;

export const RecordSubtitleText = styled(Paragraph)`
  color: ${AppColors.subtitleColor};
  text-align: center;

  @media(min-width: 1024px) {
    text-align: start;
  }
`;

export const RecordCategory = styled(RecordSubtitleText)`
  grid-column: 2 / 4;

  @media(min-width: 480px) {
    grid-column: 2 / 3;
  }

  @media(min-width: 1024px) {
    grid-row: 2 / 3;
  }
`;

export const RecordSubCategory = styled(RecordSubtitleText)`
  grid-column: 2 / 4;

  @media(min-width: 480px) {
    grid-column: 3 / 4;
  }

  @media(min-width: 1024px) {
    grid-row: 2 / 3;
  }
`;

export const RecordDescription = styled(Paragraph)`
  grid-column: 1 / 3;

  @media(min-width: 480px) {
    grid-column: 1 / 2;
  }
`;

export const RecordStatusContainer = styled.div`
  grid-column: 1 / 3;
  display: grid;
  place-items: center;

  @media (min-width: 480px) {
    grid-row: 5 / 6;
    grid-column: 1 / 2;
  }

  @media (min-width: 1024px) {
    grid-row: 4 / 5;
    grid-column: 2 / 4;
  }
`;

export const RecordStatus = styled.div`
  padding: 1rem;
  background-color: ${({ isPaid }: RecordStatusProps) => (isPaid ? AppColors.positive : AppColors.grey)};
  color: white;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StatusWhiteCircle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: white;
  padding-right: .5rem;
`;

export const RecordText = styled(Paragraph)`
  grid-column: 1 / 3;

  @media(min-width: 1024px) {
    grid-column: 1 / 2;
  }
`;

export const ChipContainer = styled.div`
  justify-self: start;
  width: 100%;
  display: grid;
  gap: 1rem;

  @media(min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-auto-rows: minmax(3.2rem, auto);
  }
`;

export const BudgetChipContainer = styled(ChipContainer)`
  grid-row: 5 / 6;

  @media(min-width: 480px) {
    grid-column: 2 / 4;
    grid-row: 4 / 5;
  }

  @media(min-width: 1024px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
`;
export const TagsChipContainer = styled(ChipContainer)`
  grid-row: 5 / 6;

  @media(min-width: 480px) {
    grid-column: 2 / 4;
    grid-row: 5 / 6;
  }

  @media(min-width: 1024px) {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }
`;

export const DrawerChipContainer = styled(ChipContainer)`
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

export const ExpensesPayed = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Expense = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

export const RecordDrawerText = styled(RecordSubtitleText)`
  text-align: center;
`;

export const RecordDrawerDescription = styled(RecordSubtitleText)`
  grid-column: 1 / 3;
`;

export const TableTitle = styled(Paragraph, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${({ isGrid = false }: RecordTableProps) => (isGrid && 'grid-column: 1 / 3;')}
  text-align: center;
`;

export const TableNote = styled(Sub)`
  color: ${AppColors.subtitleColor};
  text-align: justify;
`;

export const RecordDrawerPriceContainer = styled.div`
  text-align: center;
  grid-column: 1 / 3;
`;

export const RecordTable = styled(Table, { shouldForwardProp: (props) => props !== 'isGrid' })`
  ${(props: RecordTableProps) => (props.isGrid && 'grid-column: 1 / 3;')}
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

  @media(min-width: 1024px) {
    max-height: 80rem;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scroll-snap-type: y proximity;
  }
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
