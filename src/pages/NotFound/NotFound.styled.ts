import styled from '@emotion/styled';
import { AnchorButton } from '../../styles';

export const NotFoundContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 10rem 1fr;
  justify-content: center;
  gap: 4rem;
`;

export const Container404 = styled.div`
  align-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const NotFoundImageContainer = styled.picture`
  display: inline;
  img {
    width: 87px;
    height: 129px;
  }
`;

export const Number404 = styled.span`
  font-size: 7rem;
  font-weight: 500;
`;

export const GoBackAnchor = styled(AnchorButton)`
  justify-self: center;
`;
