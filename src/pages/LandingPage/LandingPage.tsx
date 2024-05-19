import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { AnchorButton, PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { Hero, HeroTitle } from './LandingPage.styled';

import indebtedPeopleShot from '../../assets/shot-indebted-people.jpg';
import indebtedPeopleShotWebp from '../../assets/shot-indebted-people.webp';

const LandingPage = () => (
  <>
    <Header />
    <Hero>
      <HeroTitle variant="h1">Take control of your finances</HeroTitle>
      <AnchorButton to={DASHBOARD_ROUTE}>
        <PrimaryButton variant="contained" size="large">Start now</PrimaryButton>
      </AnchorButton>
    </Hero>
    <article>
      <Typography>Did you buy something with your friend? Have control on how money he owe you and how many he has paid.</Typography>
      <picture>
        <source srcSet={indebtedPeopleShotWebp} type="image/webp" />
        <img src={indebtedPeopleShot} alt="Indebted people feature" />
      </picture>
    </article>
  </>
);

export { LandingPage };
