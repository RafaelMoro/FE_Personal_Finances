import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { AnchorButton, PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import {
  AppDescription,
  AppDescriptionBox,
  CardContainer,
  Hero, HeroTitle,
  LogoTitle,
} from './LandingPage.styled';

import budgetMasterShot from '../../assets/app-feature-shots/budget-master-app-1.png';
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
      <AppDescriptionBox>
        <img src={budgetMasterShot} alt="Budget Master App Shot" />
        <CardContainer>
          <FeatureCard title={EASY_FEATURE_TITLE} body={EASY_FEATURE_DESCRIPTION} />
          <FeatureCard title={CONTROL_FEATURE_TITLE} body={CONTROL_FEATURE_DESCRIPTION} />
        </CardContainer>
      </AppDescriptionBox>
    </AppDescription>
  </>
);

export { LandingPage };
