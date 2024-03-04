import styled from '@emotion/styled';
import { Theme, styled as styledMui } from '@mui/material/styles';
import {
  Box,
  ListItem, ListItemButton, List as ListMUI, Typography,
} from '@mui/material';

import {
  ListExpandableContainerProps,
} from './interface';
import { blinkAnimation } from '../../../styles/animations/blink';
import {
  AppColors, Chip, globalConfiguration, responsiveBreakpoints,
} from '../../../styles';
import { appTheme } from '../../../styles/theme';

export const ListItemRecord = styledMui(ListItem)(({ theme }: { theme: Theme }) => `
  width: 100%;
  min-height: 10rem;
  padding: ${theme.spacing(2)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: ${theme.spacing(3)};
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  @media ${responsiveBreakpoints.tablet} {
    grid-template-columns: 50% 25% 25%;
    column-gap: ${theme.spacing(2)};
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-template-columns: 60% 20% 20%;
    column-gap: ${theme.spacing(2)};
  }
`);

export const RecordTitle = styled(Typography)`
  grid-column: 1 / 3;
  text-wrap: balance;

  @media ${responsiveBreakpoints.tablet} {
    grid-column: 1 / 4;
  }

  @media ${responsiveBreakpoints.desktop} {
    text-align: start;
    grid-column: 1 / 2;
  }
`;

export const MainRecordDataBox = styled('div', { shouldForwardProp: (props) => props !== 'isIncome' })`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: ${appTheme.spacing(2)};

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 1 / 4;
  }
`;

export const TitleContainer = styledMui(Box)(({ theme }: { theme: Theme }) => `
  display: flex;
  gap: ${theme.spacing(2)};

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 1 / 2;
  }
`);

export const RecordDate = styled(Typography)`
  grid-column: 1 / 3;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 1 / 4;
  }
`;

export const RecordTime = styled(Typography)`
  @media ${responsiveBreakpoints.tablet} {
    grid-column: 3 / 4;
    text-align: start;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }
`;

export const RecordPrice = styled(Typography)`
  font-weight: 500;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;

export const RecordIncome = styled(RecordPrice)`
  grid-row: 2 / 3;
  color: ${AppColors.positive};
`;

export const RecordExpense = styled(RecordPrice)`
  color: ${AppColors.negative};
`;

export const RecordSubtitleText = styled(Typography)`
  text-align: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    text-align: start;
  }
`;

export const RecordCategory = styled(Typography)`
  grid-column: 2 / 4;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 2 / 3;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-row: 2 / 3;
  }
`;

export const RecordSubCategory = styled(Typography)`
  grid-column: 2 / 4;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 3 / 4;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-row: 2 / 3;
  }
`;

export const RecordDescription = styled(Typography)`
  grid-column: 1 / 3;

  @media ${responsiveBreakpoints.tablet} {
    grid-column: 1 / 2;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
  }
`;

export const RecordStatusContainer = styled.div`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  place-self: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-column: 2 / 3;
  }
`;

export const RecordText = styled(Typography)`
  grid-column: 1 / 3;

  @media ${responsiveBreakpoints.desktop} {
    grid-column: 1 / 2;
  }
`;

export const RecordsPaidNumber = styled(RecordText)`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  place-self: center;
`;

export const ChipContainer = styled.div`
  justify-self: start;
  width: 100%;
  display: grid;
  gap: 1rem;

  @media ${responsiveBreakpoints.tabletAndDesktop}{
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(3.2rem, auto);
  }
`;

export const BudgetChipContainer = styled(ChipContainer)`
  grid-row: 5 / 6;

  @media ${responsiveBreakpoints.tablet}{
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }
`;
export const TagsChipContainer = styled(ChipContainer)`
  grid-row: 5 / 6;

  @media ${responsiveBreakpoints.tablet}{
    grid-column: 3 / 4;
    grid-row: 4 / 5;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-column: 3 / 4;
    grid-row: 4 / 5;
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

export const PaymentStatusChip = styled(Chip, { shouldForwardProp: (props) => props !== 'isPaid' })`
  color: ${AppColors.white};

  & .MuiChip-label {
    font-size: ${globalConfiguration.mobile.fontSizes.P};
  }
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

export const ListExpandableContainer = styled(ListItemButton, { shouldForwardProp: (props) => props !== 'color' })`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border: .1rem solid  ${({ color }: ListExpandableContainerProps) => color};
  border-radius: 1rem;
  color: ${({ color }: ListExpandableContainerProps) => color};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    color: ${AppColors.black};
  }
`;

// Show Expenses
export const InstructionsAddExpense = styled(Typography)`
  text-wrap: balance;
`;
