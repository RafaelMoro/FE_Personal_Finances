import styled from '@emotion/styled';
import { Heading3 } from '../../styles';

export const DashboardContainer = styled.div`
  display: grid;
  @media (min-width: 480px) {
    grid-template-columns: 21rem 1fr;
  }
`;

export const AccountSection = styled.aside`
  height: 200px;
  padding-left: 1rem;
  display: grid;
  grid-template-rows: 30% 70%;

  @media (min-width: 480px) {
    height: 100vh;
    grid-template-columns: 21rem 1fr;
    grid-auto-rows: 14rem;
    gap: 1rem;
  }
`;

export const AccountsContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
`;

export const RecordsBox = styled.main`
  @media (min-width: 480px) {
    padding: 14rem 2rem 0 2rem;
  }
`;

export const AccountsTitle = styled(Heading3)`
  padding-left: 10px;
  place-self: center;

  @media (min-width: 480px) {
    align-self: center;
  }
`;
