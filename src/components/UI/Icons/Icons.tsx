import {
  ArrowDropDown as ArrowDropDownMUI, ChevronLeft as ChevronLeftMUI,
  ChevronRight as ChevronRightMUI, CalendarMonth as CalendarMonthMUI,
} from '@mui/icons-material';
import { AppColors } from '../../../styles';
import {
  AllCategoryIcons, AppIcons, CategoryIconProps, IconProps,
} from './interface';
import { APP_ICONS, categoryIcons } from './constants';

const DEFAULT_SIZE = '2.5rem';
const DEFAULT_SIZE_CLOSE_ICON = '3.5rem';

export const AppIcon = ({ size = DEFAULT_SIZE, fillColor, icon }: IconProps) => {
  const Icon = APP_ICONS[icon as keyof AppIcons].icon;
  const defaultcolor = APP_ICONS[icon as keyof AppIcons].defaultColor;
  const newSize = icon === 'Close' ? DEFAULT_SIZE_CLOSE_ICON : size;
  return (
    <Icon sx={{ fontSize: newSize, fill: fillColor ?? defaultcolor }} />
  );
};

export const CategoryIcon = ({ size = DEFAULT_SIZE, icon }: CategoryIconProps) => {
  const Icon = categoryIcons[icon as keyof AllCategoryIcons];
  if (!Icon) return null;
  return (
    <Icon sx={{ fontSize: size, fill: AppColors.black }} />
  );
};

/** Date Picker Icons */
export const CalendarMonthIcon = ({ size = DEFAULT_SIZE, fillColor }: { size: string, fillColor: string }) => (
  <CalendarMonthMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const ArrowDropDownIcon = ({ size = DEFAULT_SIZE, fillColor }: { size: string, fillColor: string }) => (
  <ArrowDropDownMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const ChevronLeftIcon = ({ size = DEFAULT_SIZE, fillColor }: { size: string, fillColor: string }) => (
  <ChevronLeftMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const ChevronRightIcon = ({ size = DEFAULT_SIZE, fillColor }: { size: string, fillColor: string }) => (
  <ChevronRightMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);
