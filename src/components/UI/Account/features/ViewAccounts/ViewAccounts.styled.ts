import styled from '@emotion/styled';
import { Heading3, PrimaryButton, SecondaryButton } from '../../../../../styles';

export const AccountSection = styled.aside`
  width: 100%;
  height: 23rem;
  grid-column: 1 / 3;
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
  width: 12rem;
  height: 6rem;
  place-self: center;
`;

export const CreateAccountButton = styled(PrimaryButton)`
  width: 12rem;
  height: 6rem;
  place-self: center;
`;

export const AccountsContainer = styled.div`
  grid-column: 1 / 3;
  justify-self: center;
  width: 25rem;
  display: grid;
  place-items: center;
`;

// **************************** Tablet

export const AccountSectionTablet = styled.aside`
  width: 100%;
  height: 23rem;
  grid-column: 1 / 3;
  padding: 3rem 0 0 3rem;
  display: grid;
  grid-template-rows: 30% 70%;
`;

export const AccountSlider = styled.div`
  padding: 1rem;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  grid-auto-columns: 20rem;
`;

// **************************** Desktop

export const AccountSectionDesktop = styled.aside`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-auto-rows: 17rem;
  gap: 2rem;
  padding: 0 1rem;
`;
