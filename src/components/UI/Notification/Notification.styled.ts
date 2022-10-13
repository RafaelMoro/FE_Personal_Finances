import styled from '@emotion/styled';
import { AppColors, Paragraph, Heading3 } from '../../../styles';

export const NotificationWrapper = styled.div`
  width: 100%;
  height: 10rem;
  padding: 1rem 1rem 0 1rem;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

export const NotificationContainer = styled.section`
  width: 100%;
  max-width: 60rem;
  height: 9rem;
  display: grid;
  grid-template-columns: 20% 70% 10%;
  grid-template-rows: 50% 50%;
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

export const NotificationTitle = styled(Heading3)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: center;
`;

export const NotificationDescription = styled(Paragraph)`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;
export const IconCloseContainer = styled.picture`
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  padding-top: 1rem;
`;
