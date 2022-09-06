import styled from '@emotion/styled';
import { Typography, CardActions, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';

import { GlobalConfiguration } from '../../styles/Global.styled';

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
  color: #E6991E;
`;

export const LoginCardForm = styled.form`
  min-width: 27.5rem;
  align-self: start;
  @media (min-width: 480px) {
    box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 1.5rem;
    &:hover {
      box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

export const FormTitle = styled.h1`
  font-size: ${GlobalConfiguration.mobile.fontSizes.H1};
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 480px) {
    font-size: ${GlobalConfiguration.tablet.fontSizes.H1};
  }
  @media (min-width: 1024px) {
    font-size: ${GlobalConfiguration.desktop.fontSizes.H1};
  }
`;

export const FormInstructions = styled.p`
  font-size: ${GlobalConfiguration.mobile.fontSizes.Sub};
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 1rem;

  @media (min-width: 480px) {
    font-size: ${GlobalConfiguration.tablet.fontSizes.Sub};
  }
  @media (min-width: 1024px) {
    font-size: ${GlobalConfiguration.desktop.fontSizes.Sub};
  }
`;

export const InputForm = styled(TextField)<TextFieldProps>`
  margin: 1rem 0;
  input {
    font-size: ${GlobalConfiguration.mobile.fontSizes.P};
  }
  label {
    font-size: ${GlobalConfiguration.mobile.fontSizes.P};
  }
  @media (min-width: 480px) {
    input {
    font-size: ${GlobalConfiguration.tablet.fontSizes.P};
    }
    label {
      font-size: ${GlobalConfiguration.tablet.fontSizes.P};
    }
  }
  @media (min-width: 1024px) {
    input {
    font-size: ${GlobalConfiguration.desktop.fontSizes.P};
    }
    label {
      font-size: ${GlobalConfiguration.desktop.fontSizes.P};
    }
  }
`;

export const LoginCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;
