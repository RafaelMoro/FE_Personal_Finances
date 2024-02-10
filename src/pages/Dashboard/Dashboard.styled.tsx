import styled from '@emotion/styled';
import { RecordBoxProps } from './interface';
import { responsiveBreakpoints } from '../../styles';

export const DashboardContainer = styled.div`
  position: relative;
  height: 88vh;
  max-width: 155rem;
  margin: 0 auto;

  @media ${responsiveBreakpoints.desktop} {
    display: grid;
    grid-template-columns: 30rem 1fr;
  }
`;

export const RecordsBox = styled('main', { shouldForwardProp: (props) => props !== 'noAccountsCreated' })`
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  @media ${responsiveBreakpoints.tablet} {
    grid-column: 1 / 3;
    padding: 0 2rem 0 2rem;
  }

  @media ${responsiveBreakpoints.desktop} {
    grid-column: 2 / 3;
    ${({ noAccountsCreated }: RecordBoxProps) => (noAccountsCreated && 'grid-column: 1 / 3;')}
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    padding-bottom: 8rem;
  }
`;
