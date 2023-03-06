import styled from '@emotion/styled';

export const DashboardContainer = styled.div`
  display: grid;
  @media (min-width: 1024px) {
    grid-template-columns: 21rem 1fr;
  }
`;

export const RecordsBox = styled.main`
  @media (min-width: 480px) {
    padding: 14rem 2rem 0 2rem;
  }
`;

export const Header = styled.div`
  grid-column: 1 / 3;
`;
