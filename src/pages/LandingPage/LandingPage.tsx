import { Header } from '../../components/templates';
import { AnchorButton, PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { Hero, HeroTitle } from './LandingPage.styled';

const LandingPage = () => (
  <>
    <Header />
    <Hero>
      <HeroTitle variant="h1">Take control of your finances</HeroTitle>
      <AnchorButton to={DASHBOARD_ROUTE}>
        <PrimaryButton variant="contained" size="large">Start now</PrimaryButton>
      </AnchorButton>
    </Hero>
  </>
);

export { LandingPage };
