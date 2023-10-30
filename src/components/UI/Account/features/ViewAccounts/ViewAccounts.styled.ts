import styled from '@emotion/styled';
import { PrimaryButton, SecondaryButton } from '../../../../../styles';
import { ViewAccountsStylesProps } from './interface';

export const AccountSectionBasicStyles = styled('aside', { shouldForwardProp: (props) => props !== 'hide' })`
  width: 100%;
  height: 23rem;
  grid-column: 1 / 3;
  margin-top: 2rem;
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

export const AccountSection = styled('aside', { shouldForwardProp: (props) => props !== 'hide' })`
  display: ${({ hide }: ViewAccountsStylesProps) => (hide ? 'none' : 'grid')};
`;

export const AccountSectionError = styled(AccountSectionBasicStyles)`
  padding: 0 2rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
`;

export const AccountSectionLoading = styled.article`
  width: 100%;
  height: 23rem;
  padding: 2rem;
  display: grid;
  place-items: center;

  @media(min-width: 480px) {
    overflow-x: scroll;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    gap: 2rem;
    grid-auto-flow: column;
    grid-template-rows: 1fr;
    grid-auto-columns: 25rem;
  }

  @media(min-width: 1024px) {
    grid-row: 2 / 3;
    overflow-x: unset;
    grid-auto-flow: row;
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

export const AccountSectionTablet = styled('aside', { shouldForwardProp: (props) => props !== 'hide' })`
${({ hide }: ViewAccountsStylesProps) => (hide && 'display: none;')}
  width: 100%;
  height: 23rem;
  grid-column: 1 / 3;
  padding: 0 0 0 3rem;
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
  grid-auto-columns: 25rem;
`;

// **************************** Desktop

export const AccountSectionDesktop = styled('aside', { shouldForwardProp: (props) => props !== 'hide' })`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;
  display: ${({ hide }: ViewAccountsStylesProps) => (hide ? 'none' : 'grid')};
  grid-auto-rows: 20rem;
  gap: 2rem;
  padding: 0 1rem;
`;
