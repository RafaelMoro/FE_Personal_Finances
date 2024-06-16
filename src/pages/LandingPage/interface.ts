export interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  imageSrcWebp: string;
  imageAtl: string;
  showPrimaryBgColor?: boolean;
  reverse?: boolean;
}

export interface FeatureBoxProps {
  showPrimaryBgColor: boolean;
  reverse: boolean;
}

export interface FeatureTextProps {
  showPrimaryBgColor: boolean;
}
