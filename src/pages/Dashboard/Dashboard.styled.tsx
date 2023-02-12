import styled from '@emotion/styled';
import { Heading3 } from '../../styles';

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 21rem 1fr;
`;

export const AccountsBox = styled.aside`
  height: 100vh;
  padding-left: 1rem;
  display: grid;
  grid-auto-rows: 14rem;
  gap: 1rem;
`;

export const RecordsBox = styled.main`
  padding: 14rem 2rem 0 2rem;
`;

export const AccountsTitle = styled(Heading3)`
  padding-left: 10px;
  align-self: center;
`;
