import {
  FeatureDescriptionBox, FeatureText, Feature as FeatureBox, FeatureImage,
} from './LandingPage.styled';
import { FeatureProps } from './interface';

const Feature = ({
  title, description, imageSrc, imageAtl, showPrimaryBgColor = false, reverse = false,
}: FeatureProps) => (
  <FeatureBox reverse={reverse} showPrimaryBgColor={showPrimaryBgColor}>
    <FeatureDescriptionBox>
      <FeatureText showPrimaryBgColor={showPrimaryBgColor} variant="h4">{title}</FeatureText>
      <FeatureText showPrimaryBgColor={showPrimaryBgColor}>{description}</FeatureText>
    </FeatureDescriptionBox>
    <FeatureImage src={imageSrc} alt={imageAtl} />
  </FeatureBox>
);

export { Feature };
