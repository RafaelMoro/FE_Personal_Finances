import { createTheme } from '@mui/material';
import { AppColors, globalConfiguration, responsiveBreakpoints } from './GlobalConfigObjects';

declare module '@mui/material' {
  interface TypographyOptions {
    subText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subText?: React.CSSProperties;
  }

  interface TypographyPropsVariantOverrides {
    subText: true;
  }
}

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: AppColors.primary,
      light: AppColors.primaryLight,
      dark: AppColors.primaryDark,
    },
    secondary: {
      main: AppColors.secondary,
      light: AppColors.secondaryLight,
      dark: AppColors.secondaryDark,
    },
    error: {
      main: AppColors.negative,
      light: AppColors.negativeLight,
      dark: AppColors.negativeDark,
    },
    success: {
      main: AppColors.positive,
      light: AppColors.positiveLight,
      dark: AppColors.positiveDark,
    },
    warning: {
      main: AppColors.warning,
      light: AppColors.warningLight,
      dark: AppColors.warningDark,
    },
    info: {
      main: AppColors.info,
      light: AppColors.infoLight,
      dark: AppColors.infoDark,
    },
  },
  typography: {
    fontFamily: 'Roboto',
    /** Add subText font size breakpoints */
    subText: {
      [`@media${responsiveBreakpoints.mobile}`]: {
        fontSize: globalConfiguration.mobile.fontSizes.Sub,
      },
      [`@media${responsiveBreakpoints.tablet}`]: {
        fontSize: globalConfiguration.tablet.fontSizes.Sub,
      },
      [`@media${responsiveBreakpoints.desktop}`]: {
        fontSize: globalConfiguration.desktop.fontSizes.Sub,
      },
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          /** Add subText variant */
          subText: 'p',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          /** Override the fontsize breakpoints of the helper text that is shown when an input has a error validation */
          [`@media${responsiveBreakpoints.mobile}`]: {
            fontSize: globalConfiguration.mobile.fontSizes.Sub,
          },
          [`@media${responsiveBreakpoints.tablet}`]: {
            fontSize: globalConfiguration.tablet.fontSizes.Sub,
          },
          [`@media${responsiveBreakpoints.desktop}`]: {
            fontSize: globalConfiguration.desktop.fontSizes.Sub,
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          /** Override the fontsize breakpoints of buttons */
          [`@media${responsiveBreakpoints.mobile}`]: {
            fontSize: globalConfiguration.mobile.fontSizes.P,
          },
          [`@media${responsiveBreakpoints.tablet}`]: {
            fontSize: globalConfiguration.tablet.fontSizes.P,
          },
          [`@media${responsiveBreakpoints.desktop}`]: {
            fontSize: globalConfiguration.desktop.fontSizes.P,
          },
        },
      },
    },
  },
});

appTheme.typography.h1 = {
  /** Below small: 600px, use this styles  */
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.H1,
  },
  /** Between small 600px and medium 900px: use this styles  */
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.H1,
  },
  /** Above medium: 900px, use this styles  */
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.H1,
  },
};

appTheme.typography.h2 = {
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.H2,
  },
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.H2,
  },
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.H2,
  },
};

appTheme.typography.h3 = {
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.H3,
  },
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.H3,
  },
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.H3,
  },
};

appTheme.typography.h4 = {
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.H4,
  },
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.H4,
  },
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.H4,
  },
};

appTheme.typography.h5 = {
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.H5,
  },
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.H5,
  },
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.H5,
  },
};

appTheme.typography.body1 = {
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.P,
  },
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.P,
  },
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.P,
  },
};

appTheme.typography.body2 = {
  color: AppColors.subtitleColor,
  [appTheme.breakpoints.down('sm')]: {
    fontSize: globalConfiguration.mobile.fontSizes.P,
  },
  [appTheme.breakpoints.between('sm', 'md')]: {
    fontSize: globalConfiguration.tablet.fontSizes.P,
  },
  [appTheme.breakpoints.up('md')]: {
    fontSize: globalConfiguration.desktop.fontSizes.P,
  },
};
