import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { AppColors, responsiveBreakpoints } from '../../styles';
import heroDesktop from '../../assets/hero-desktop-webp.webp';
import heroMobile from '../../assets/hero-mobile-webp.webp';
import heroTablet from '../../assets/hero-tablet-webp.webp';
import { appTheme } from '../../styles/theme';

export const Hero = styled.div`
  height: 50rem;
  margin-bottom: ${appTheme.spacing(5)};
  display: grid;
  place-items: center;
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

export const FeatureBox = styled.article`
  width: 100%;
  margin: 0 auto;
  max-width: 110rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10rem;
`;

export const FeaturePictureBox = styled.picture`
  display: block;
  img {
    width: 40rem;
    height: 100%;
    border-radius: 1rem;
    object-fit: contain;
  }
`;
