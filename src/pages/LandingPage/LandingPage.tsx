import { Header } from '../../components/templates';
import { PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import {
  AnchorButtonHero,
  AppDescription,
  AppDescriptionBox,
  AppDescriptionTitle,
  CardContainer,
  HeaderHeroBox,
  Hero, HeroTitle,
} from './LandingPage.styled';

import budgetMasterShot from '../../assets/app-feature-shots/budget-master-app-1.png';
import { FeatureCard } from './FeatureCard';
import {
  CONTROL_FEATURE_DESCRIPTION, CONTROL_FEATURE_TITLE, EASY_FEATURE_DESCRIPTION, EASY_FEATURE_TITLE,
} from './constants';

const LandingPage = () => (
  <>
    <HeaderHeroBox>
      <Header isLandingPage />
      <Hero>
        <HeroTitle variant="h1">
          Don&apos;t let your credit cards to be out of control
        </HeroTitle>
        <AnchorButtonHero to={DASHBOARD_ROUTE}>
          <PrimaryButton variant="contained" size="large">Start now</PrimaryButton>
        </AnchorButtonHero>
      </Hero>
    </HeaderHeroBox>
    <AppDescription>
      <AppDescriptionTitle align="center" variant="h3">
        What is
        {' '}
        <span>Budget Master</span>
        {' '}
        ?
      </AppDescriptionTitle>
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
