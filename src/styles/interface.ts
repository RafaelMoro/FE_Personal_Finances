export interface FontSizes {
  H1: string,
  H2: string,
  H3: string,
  H4: string,
  H5: string,
  Sub: string;
  P: string,
}
export interface GlobalConfiguration {
  mobile: {
    fontSizes: FontSizes
  },
  tablet: {
    fontSizes: FontSizes
  },
  desktop: {
    fontSizes: FontSizes
  }
}

export interface TextColors {
  name: string;
  color: string;
}

export interface BackgroundColors {
  name: string;
  color: string;
}

export interface FlexContainerProps {
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
  flexDirection?: string;
  margin?: number;
  padding?: number;
}

export interface ChipProps {
  chipColor?: string;
}
