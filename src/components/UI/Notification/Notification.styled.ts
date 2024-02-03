import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { AppColors } from '../../../styles';

export const NotificationWrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem 0 1rem;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

export const NotificationContainer = styled.section`
  width: 100%;
  max-width: 60rem;
  min-height: 9rem;
  display: grid;
  grid-template-columns: 20% 70% 10%;
  grid-template-rows: min-content 1fr;
  background-color: ${AppColors.white};
  border-radius: 1rem;
  box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
  &:hover {
      box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
      animation: none;
    }
`;

export const IconStatusContainer = styled.picture`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  display: grid;
  place-items: center;
  svg {
    color: ${AppColors.negative};
  }
`;

export const NotificationTitle = styled(Typography)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: center;
`;

export const NotificationDescription = styled(Typography)`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  margin: 2rem 0;
`;
export const NotificationUIElementContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  justify-self: center;
  margin: 2rem 0;
`;
export const IconCloseContainer = styled.picture`
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  padding-top: 1rem;
`;
