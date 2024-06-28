import {
  FeatureDescriptionBox, FeatureText, Feature as FeatureBox, FeatureImage,
  FeatureImageBox,
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
    <FeatureImageBox>
      <source srcSet={imageSrcWebp} type="image/webp" />
      <FeatureImage src={imageSrc} alt={imageAtl} />
    </FeatureImageBox>
  </FeatureBox>
);

export { Feature };
