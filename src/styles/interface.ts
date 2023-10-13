export interface FontSizes {
  H1: string,
  H2: string,
  H3: string,
  H4: string,
  P: string,
  Sub: string,
}
export interface IGlobalConfiguration {
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

export interface ITextColors {
  name: string;
  color: string;
}

export interface IBackgroundColors {
  name: string;
  color: string;
}

export interface ParagraphProps {
  align?: string;
}

export interface FlexContainerProps {
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  flexDirection?: string;
  margin?: string;
  padding?: string;
}

export interface ChipProps {
  chipColor?: string;
}
