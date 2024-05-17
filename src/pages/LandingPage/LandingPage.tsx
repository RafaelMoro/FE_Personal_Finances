import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { AnchorButton, PrimaryButton } from '../../styles';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { Hero } from './LandingPage.styled';

const LandingPage = () => (
  <>
    <Header />
    <Hero>
      <Typography variant="body1">Take control of your finances</Typography>
      <AnchorButton to={DASHBOARD_ROUTE}>
        <PrimaryButton variant="contained" size="large">Start now</PrimaryButton>
      </AnchorButton>
    </Hero>
  </>
);

export { LandingPage };
