import {
  FeatureDescriptionBox, FeatureText, Feature as FeatureBox, FeatureImage,
} from './LandingPage.styled';
import { FeatureProps } from './interface';

const Feature = ({
  title, description, imageSrc, imageSrcWebp, imageAtl, showPrimaryBgColor = false, reverse = false,
}: FeatureProps) => (
  <FeatureBox reverse={reverse} showPrimaryBgColor={showPrimaryBgColor}>
    <FeatureDescriptionBox>
      <FeatureText showPrimaryBgColor={showPrimaryBgColor} variant="h4">{title}</FeatureText>
      <FeatureText showPrimaryBgColor={showPrimaryBgColor}>{description}</FeatureText>
    </FeatureDescriptionBox>
    <picture>
      <source srcSet={imageSrcWebp} type="image/webp" />
      <FeatureImage src={imageSrc} alt={imageAtl} />
    </picture>
  </FeatureBox>
);

export { Feature };
