import styled from '@emotion/styled';
import { Form } from 'formik';
import { Heading1, Paragraph } from '../../styles';

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 10% 20% 70%;
`;

export const ForgotPasswordTitle = styled(Heading1)`
  place-self: center;
`;

export const ForgotPasswordDescription = styled(Paragraph)`
  padding-left: 1rem;
  justify-self: center;
`;

export const ForgotPasswordForm = styled(Form)`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-items: center;
`;
