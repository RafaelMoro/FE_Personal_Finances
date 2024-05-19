import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { AnchorButton, PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import {
  FeatureBox, FeaturePictureBox, Hero, HeroTitle,
} from './LandingPage.styled';

import indebtedPeopleShot from '../../assets/app-feature-shots/shot-indebted-people.png';
import indebtedPeopleShotWebp from '../../assets/app-feature-shots/shot-indebted-people.webp';

const LandingPage = () => (
  <>
    <Header />
    <Hero>
      <HeroTitle variant="h1">Take control of your finances</HeroTitle>
      <AnchorButton to={DASHBOARD_ROUTE}>
        <PrimaryButton variant="contained" size="large">Start now</PrimaryButton>
      </AnchorButton>
    </Hero>
    <FeatureBox>
      <Typography>
        Did you buy something with your friend?
        <br />
        {' '}
        Have control on how money he owe you and how many he has paid.
      </Typography>
      <FeaturePictureBox>
        <source srcSet={indebtedPeopleShotWebp} type="image/webp" />
        <img src={indebtedPeopleShot} alt="Indebted people feature" />
      </FeaturePictureBox>
    </FeatureBox>
  </>
);

export { LandingPage };
