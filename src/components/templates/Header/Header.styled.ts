import styled from '@emotion/styled';
import { HeaderShadowProps } from './interface';

export const HeaderShadow = styled.header`
  padding: 2rem;
  max-height: 11.3rem;
  ${(props: HeaderShadowProps) => (!props.isLandingPage && 'box-shadow: 0 .2rem .4rem rgba(0, 0, 0, 0.2); margin-bottom: 2rem;')}
`;

export const HeaderContainer = styled.div`
  max-width: 153rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
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
