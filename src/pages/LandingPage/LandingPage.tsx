import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../../components/templates';
import {
  AppDescription,
  AppDescriptionBox,
  AppDescriptionTitle,
  CardContainer,
  HeaderHeroBox,
  Hero, HeroTitle,
  StartNowButton,
} from './LandingPage.styled';

import budgetMasterShot from '../../assets/app-feature-shots/budget-master-app.png';
import budgetMasterShotWebp from '../../assets/app-feature-shots/budget-master-app.webp';
import indebtedPeopleFeature from '../../assets/app-feature-shots/indebted-people-feature-shot-detailed.png';
import indebtedPeopleFeatureWebp from '../../assets/app-feature-shots/indebted-people-feature-shot-detailed.webp';
import relateTransactionFeature from '../../assets/app-feature-shots/relate-expense-feature.png';
import relateTransactionFeatureWebp from '../../assets/app-feature-shots/relate-expense-feature.webp';
import { Feature } from './Feature';
import { FeatureCard } from './FeatureCard';
import { useResizeWindow } from '../../hooks/useResizeWindow';
import {
  CONTROL_FEATURE_DESCRIPTION, CONTROL_FEATURE_TITLE, EASY_FEATURE_DESCRIPTION, EASY_FEATURE_TITLE,
} from './constants';
import { useGuestUser } from '../../hooks/useGuestUser/useGuestUser';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { useSyncLoginInfo } from '../../hooks/useSyncLoginInfo';
import { getHeroButtonText } from './utils';

const LandingPage = () => {
  const navigate = useNavigate();
  useResizeWindow();
  const { addGuestUser, isGuestUser, userLoggedOn } = useGuestUser();
  const { verifyGuestUser } = useSyncLoginInfo();

  const heroButtonText = getHeroButtonText(isGuestUser, userLoggedOn);

  useEffect(() => {
    verifyGuestUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartNow = () => {
    if (isGuestUser || userLoggedOn) {
      navigate(DASHBOARD_ROUTE);
      return;
    }
    addGuestUser();
    navigate(DASHBOARD_ROUTE);
  };

  return (
    <>
      <HeaderHeroBox>
        <Header isLandingPage />
        <Hero>
          <HeroTitle variant="h1">
            Don&apos;t let your credit cards to be out of control
          </HeroTitle>
          <StartNowButton onClick={handleStartNow} variant="contained" size="large">{heroButtonText}</StartNowButton>
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
          <picture>
            <source srcSet={budgetMasterShotWebp} type="image/webp" />
            <img src={budgetMasterShot} alt="Budget Master App Shot" />
          </picture>
          <CardContainer>
            <FeatureCard title={EASY_FEATURE_TITLE} body={EASY_FEATURE_DESCRIPTION} />
            <FeatureCard title={CONTROL_FEATURE_TITLE} body={CONTROL_FEATURE_DESCRIPTION} />
          </CardContainer>
        </AppDescriptionBox>
      </AppDescription>
      <Feature
        title="Did you buy something with your friends and don't know who owes what?"
        description="Have full control on who owes what, how many is remaining and who has paid fully."
        imageSrc={indebtedPeopleFeature}
        imageSrcWebp={indebtedPeopleFeatureWebp}
        imageAtl="Feature of people owning you money"
        showPrimaryBgColor
      />
      <Feature
        title="Is it hard to remember what transactions has been fully paid?"
        description="When making a transfer from your debit card into your credit card, link the transactions to that payment."
        imageSrc={relateTransactionFeature}
        imageSrcWebp={relateTransactionFeatureWebp}
        imageAtl="Feature of relating transactions to payments"
        reverse
      />
    </>
  );
};

export { LandingPage };
