import styled from '@emotion/styled';

export const DashboardContainer = styled.div`
  height: 100vh;
  position: relative;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 30rem 1fr;
  }
`;

export const RecordsBox = styled.main`
  width: 100%;
  grid-column: 1 / 3;
  @media (min-width: 480px) {
    padding: 14rem 2rem 0 2rem;
  }
  @media (min-width: 1024px) {
    grid-column: 2 / 3;
  }
`;

export const Header = styled.div`
  grid-column: 1 / 3;
`;
