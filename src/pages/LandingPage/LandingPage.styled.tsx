import styled from '@emotion/styled';
import { responsiveBreakpoints } from '../../styles';
import heroDesktop from '../../assets/hero-desktop-webp.webp';
import heroMobile from '../../assets/hero-mobile-webp.webp';
import heroTablet from '../../assets/hero-tablet-webp.webp';

export const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${heroMobile});
  background-repeat:no-repeat;
  background-size:contain;

  @media ${responsiveBreakpoints.tablet} {
    background-image: url(${heroTablet});
  }

  @media ${responsiveBreakpoints.desktop} {
    background-image: url(${heroDesktop});
  }
`;
