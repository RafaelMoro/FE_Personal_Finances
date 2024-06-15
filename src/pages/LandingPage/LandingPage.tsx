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
import firstImageIndebtedPeopleFeature from '../../assets/app-feature-shots/indebted-people-feature-shot-detailed-2.png';
import relateTransactionImage from '../../assets/app-feature-shots/relate-expense-feature.png';
import { Feature } from './Feature';
import { FeatureCard } from './FeatureCard';
import { useResizeWindow } from '../../hooks/useResizeWindow';
import {
  CONTROL_FEATURE_DESCRIPTION, CONTROL_FEATURE_TITLE, EASY_FEATURE_DESCRIPTION, EASY_FEATURE_TITLE,
} from './constants';

const LandingPage = () => {
  useResizeWindow();

  return (
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
      <Feature
        title="Did you buy something with your friends and don't know who owes what?"
        description="Have full control on who owes what, how many is remaining and who has paid fully."
        imageSrc={firstImageIndebtedPeopleFeature}
        imageAtl="Feature of people owning you money"
        showPrimaryBgColor
      />
      <Feature
        title="Is it hard to remember what transactions has been fully paid?"
        description="When making a transfer from your debit card into your credit card, link the transactions to that payment."
        imageSrc={relateTransactionImage}
        imageAtl="Feature of relating transactions to payments"
        reverse
      />
    </>
  );
};

export { LandingPage };
