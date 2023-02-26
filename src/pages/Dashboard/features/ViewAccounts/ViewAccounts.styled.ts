import styled from '@emotion/styled';
import { Heading3, SecondaryButton } from '../../../../styles';

export const AccountSection = styled.aside`
  width: 100%;
  height: 23rem;
  margin-top: 2rem;
  display: grid;
  grid-template-rows: 30% 70%;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  row-gap: 1rem;

  @media (min-width: 1024px) {
    height: 100vh;
    grid-template-columns: 21rem 1fr;
    grid-auto-rows: 14rem;
    gap: 1rem;
  }
`;

export const AccountSectionError = styled(AccountSection)`
  padding: 0 2rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
`;

export const AccountSectionLoading = styled.article`
  width: 100%;
  height: 23rem;
  margin-top: 2rem;
  display: grid;
  place-items: center;
`;

export const AccountsTitle = styled(Heading3)`
  padding-left: 10px;
  place-self: center;

  @media (min-width: 480px) {
    align-self: center;
  }
`;

export const ChangeAccountButton = styled(SecondaryButton)`
  width: 120px;
  height: 60px;
  place-self: center;
`;

export const AccountsContainer = styled.div`
  grid-column: 1 / 3;
  justify-self: center;
  width: 20rem;
  display: grid;
  place-items: center;
`;
