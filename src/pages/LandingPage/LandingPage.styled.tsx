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

export const LogoTitle = styled(Typography)`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
  display: inline-block;
`;

export const AppDescription = styled.section`
  margin-top: 10rem;
`;

export const AppDescriptionBox = styled.div`
margin-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  gap: 3rem;
`;

export const Card = styled.article`
  padding: 3rem;
  max-width: 45rem;
  box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
  }
`;

export const FeatureTitle = styled(Typography)`
  color: ${AppColors.primary};
  font-size: 3rem !important;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4rem;
`;
