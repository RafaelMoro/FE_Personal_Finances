import styled from '@emotion/styled';
import { Typography, CardActions } from '@mui/material';

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
  align-self: flex-start;
  @media (min-width: 420px) {
    box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 1.5rem;
    &:hover {
      box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

export const titleStyles = {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
};

export const descriptionStyle = {
  fontSize: 12,
};

export const inputStyles = {
  margin: '1rem 0',
};

export const LoginCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;

export const buttonStyles = {
  backgroundColor: '#E6991E',
};
