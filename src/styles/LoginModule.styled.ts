import styled from '@emotion/styled';
import { Form } from 'formik';
import { Heading1, Paragraph } from './Global.styled';

/*
* Here are all emotion components that may be re-used in the Login module
*/

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  padding-top: 8rem;
  display: grid;
  justify-content: center;
`;

export const MainContainer = styled.article`
  height: 50%;
  display: grid;
  gap: 5rem;
  grid-template-rows: 10% 20% 60%;

  @media (min-width: 480px) {
    max-width: 50rem;
    height: 70%;
  }
`;

export const FormTitle = styled(Heading1)`
  place-self: center;
`;

export const FormDescription = styled(Paragraph)`
  padding-left: 1rem;
  justify-self: center;
`;

export const FormContainer = styled(Form)`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  justify-items: center;
`;

export const FormActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LoaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

`;

export const MessageContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 2rem;
`;

export const AnchorContainer = styled.div`
  width: 100%;
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
`;
