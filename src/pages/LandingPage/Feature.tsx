import { FeatureDescriptionBox, FeatureText, Feature as FeatureBox } from './LandingPage.styled';
import { FeatureProps } from './interface';

const Feature = ({
  title, description, imageSrc, imageAtl, showPrimaryBgColor = false,
}: FeatureProps) => (
  <FeatureBox showPrimaryBgColor={showPrimaryBgColor}>
    <FeatureDescriptionBox>
      <FeatureText variant="h4">{title}</FeatureText>
      <FeatureText>{description}</FeatureText>
    </FeatureDescriptionBox>
    <img src={imageSrc} alt={imageAtl} />
  </FeatureBox>
);

export { Feature };
