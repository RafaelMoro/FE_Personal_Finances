import styled from '@emotion/styled';
import { responsiveBreakpoints } from '../../../styles';

export const HeaderContainer = styled.header`
  padding: 2rem;
  display: flex;
  max-height: 11.3rem;
  justify-content: space-between;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;

  @media ${responsiveBreakpoints.desktop} {
    grid-column: 1 / 3;
  }
`;

export const LogoImageContainer = styled.picture`
  display: block;
  width: 7rem;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
