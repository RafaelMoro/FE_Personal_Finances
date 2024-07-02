import { Typography } from '@mui/material';
import { Card, FeatureTitle } from './LandingPage.styled';

interface FeatureCardProps {
  title: string;
  body: string;
}

const FeatureCard = ({ title, body }: FeatureCardProps) => (
  <Card>
    <FeatureTitle variant="h4">{title}</FeatureTitle>
    <Typography>{body}</Typography>
  </Card>
);

export { FeatureCard };
