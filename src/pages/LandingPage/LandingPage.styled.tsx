import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { AnchorButton, AppColors, responsiveBreakpoints } from '../../styles';
import { appTheme } from '../../styles/theme';
import { BG_HERO_IMAGE_URL } from './constants';

export const HeaderHeroBox = styled.div`
  background-image: url(${BG_HERO_IMAGE_URL});
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BG_HERO_IMAGE_URL});
  background-repeat:no-repeat;
  background-size: cover;
  background-position: center center;

  @media ${responsiveBreakpoints.tablet} {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BG_HERO_IMAGE_URL});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
  }

  @media ${responsiveBreakpoints.desktop} {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BG_HERO_IMAGE_URL});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
  }
`;

export const Hero = styled.div`
  height: 70rem;
  margin-bottom: ${appTheme.spacing(5)};
  display: grid;
  justify-content: center;
  gap: 3rem;
`;

export const HeroTitle = styled(Typography)`
  color: ${AppColors.white};
  align-self: flex-end;
`;

export const AnchorButtonHero = styled(AnchorButton)`
  justify-self: center;
`;

export const AppDescription = styled.section`
  margin-top: 10rem;
`;

export const AppDescriptionTitle = styled(Typography)`
  span {
    font-family: 'Russo One', sans-serif;
    color: ${AppColors.primary};
  }
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
  font-weight: 900;
  text-align: center;
  margin-bottom: 4rem;
`;
