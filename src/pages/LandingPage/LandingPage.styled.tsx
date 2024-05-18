import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { AppColors, responsiveBreakpoints } from '../../styles';
import heroDesktop from '../../assets/hero-desktop-webp.webp';
import heroMobile from '../../assets/hero-mobile-webp.webp';
import heroTablet from '../../assets/hero-tablet-webp.webp';

export const Hero = styled.div`
  display: grid;
  place-items: center;
  height: 50rem;
  background-image: url(${heroMobile});
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${heroMobile});
  background-repeat:no-repeat;
  background-size: cover;
  background-position: center center;

  @media ${responsiveBreakpoints.tablet} {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${heroTablet});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
  }

  @media ${responsiveBreakpoints.desktop} {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${heroDesktop});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
  }
`;

export const HeroTitle = styled(Typography)`
  color: ${AppColors.white};
`;
