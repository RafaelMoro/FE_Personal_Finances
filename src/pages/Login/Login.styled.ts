import styled from '@emotion/styled';
import { Typography, CardActions } from '@mui/material';

import {
  AppColors, InputForm, Paragraph, Heading1,
} from '../../styles';

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  display: grid;
  grid-template-rows: 40% 60%;
  place-items: center;
`;

export const LogoContainer = styled.div`
  display: grid;
  gap: 1rem;
  place-items: center;
`;

export const LogoImageContainer = styled.picture`
  width: 17rem;
  display: grid;
  grid-auto-rows: 17rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LogoTitle = styled(Typography)`
  font-family: 'Permanent Marker', cursive;
  font-size: 2.5rem;
  color: ${AppColors.primary};
`;

export const LoginCard = styled.div`
  min-width: 27.5rem;
  align-self: start;
  @media (min-width: 480px) {
    max-height: 45rem;
    width: 45rem;
    padding: 3rem;
    box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 1.5rem;
    &:hover {
      box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

export const FormTitle = styled(Heading1)`
  text-align: center;
  margin-bottom: 2rem;
`;

export const FormInstructions = styled(Paragraph)`
  color: ${AppColors.subtitleColor};
  margin-bottom: 1rem;
`;

export const LoginInput = styled(InputForm)`
  margin: 1rem 0;
`;

export const LoginCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;
