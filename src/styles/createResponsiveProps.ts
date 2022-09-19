import { GlobalConfiguration, ResponsiveBreakpoints } from './GlobalConfigObjects';
import { FontSizes } from './interface';

type FontWeight = 'normal' | 'bold';
type FontSizesKeys = keyof FontSizes;
interface ICreateResponsivePropsParameters {
  fontSize: FontSizesKeys;
  fontWeight?: FontWeight;
  important?: boolean;
}

export function createResponsiveProps({ fontSize = 'P', fontWeight = 'normal', important = false }: ICreateResponsivePropsParameters) {
  const importantProperty = important ? '!important' : '';
  return `
    font-size: ${GlobalConfiguration.mobile.fontSizes[fontSize]} ${importantProperty};
    font-weight: ${fontWeight};

    @media (min-width: ${ResponsiveBreakpoints.tablet}) {
      font-size: ${GlobalConfiguration.tablet.fontSizes[fontSize]} ${importantProperty};
    }
    @media (min-width: ${ResponsiveBreakpoints.desktop}) {
      font-size: ${GlobalConfiguration.desktop.fontSizes[fontSize]} ${importantProperty};
    }
  `;
}
