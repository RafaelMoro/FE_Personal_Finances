import { createTheme } from '@mui/material';
import { AppColors } from './GlobalConfigObjects';

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
});
