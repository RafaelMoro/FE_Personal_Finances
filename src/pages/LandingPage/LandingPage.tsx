import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { AnchorButton, FlexContainer, PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import {
  AppDescription,
  FeatureBox, FeaturePictureBox, Hero, HeroTitle,
  LogoTitle,
} from './LandingPage.styled';

import indebtedPeopleShot from '../../assets/app-feature-shots/shot-indebted-people.png';
import budgetMasterShot from '../../assets/app-feature-shots/budget-master-app-1.png';
import indebtedPeopleShotWebp from '../../assets/app-feature-shots/shot-indebted-people.webp';
import { FeatureCard } from './FeatureCard';
import {
  CONTROL_FEATURE_DESCRIPTION, CONTROL_FEATURE_TITLE, EASY_FEATURE_DESCRIPTION, EASY_FEATURE_TITLE,
} from './constants';

const LandingPage = () => (
  <>
    <Header />
    <Hero>
      <HeroTitle variant="h1">Take control of your finances</HeroTitle>
      <AnchorButton to={DASHBOARD_ROUTE}>
        <PrimaryButton variant="contained" size="large">Start now</PrimaryButton>
      </AnchorButton>
    </Hero>
    <AppDescription>
      <Typography align="center" variant="h3">
        What is
        {' '}
        <LogoTitle variant="h3">Budget Master</LogoTitle>
        {' '}
        ?
      </Typography>
      <FlexContainer gap={2}>
        <img src={budgetMasterShot} alt="Budget Master App Shot" />
        <FlexContainer flexDirection="column" justifyContent="space-between" alignItems="center">
          <FeatureCard title={EASY_FEATURE_TITLE} body={EASY_FEATURE_DESCRIPTION} />
          <FeatureCard title={CONTROL_FEATURE_TITLE} body={CONTROL_FEATURE_DESCRIPTION} />
        </FlexContainer>
      </FlexContainer>
    </AppDescription>
    {/* <FeatureBox>
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
    </FeatureBox> */}
  </>
);

export { LandingPage };
