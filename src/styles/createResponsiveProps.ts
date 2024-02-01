import { globalConfiguration, ResponsiveBreakpoints } from './GlobalConfigObjects';
import { FontSizes } from './interface';

type FontWeight = 'normal' | 'bold' | '500';
type FontSizesKeys = keyof FontSizes;
interface ICreateResponsivePropsParameters {
  fontSize: FontSizesKeys;
  fontWeight?: FontWeight;
  important?: boolean;
}

/*
** This function sets font size and font weight responsively with media queries
** It recieves an object of configuration:
**  fontSize: string that are keys of fontSize interface: H1, H2, H3, P, Sub
**  fontWeight: string using type FontWeight that accepts: normal | bold
**  important: boolean that sets if the css property should be "!important"

** It returns a string to style a emotion styled component according to global configuration
** settings.
*/

export function createResponsiveProps({ fontSize = 'P', fontWeight = 'normal', important = false }: ICreateResponsivePropsParameters) {
  const importantProperty = important ? '!important' : '';
  return `
    font-size: ${globalConfiguration.mobile.fontSizes[fontSize]} ${importantProperty};
    font-weight: ${fontWeight};

    @media (min-width: ${ResponsiveBreakpoints.tablet}) {
      font-size: ${globalConfiguration.tablet.fontSizes[fontSize]} ${importantProperty};
    }
    @media (min-width: ${ResponsiveBreakpoints.desktop}) {
      font-size: ${globalConfiguration.desktop.fontSizes[fontSize]} ${importantProperty};
    }
  `;
}
