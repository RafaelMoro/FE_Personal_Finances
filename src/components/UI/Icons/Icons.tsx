import {
  EditOutlined, DeleteOutlined, Close, LogoutOutlined, KeyboardArrowUpOutlined,
  DoneOutlined, Visibility as VisibilityMui, VisibilityOff as VisibilityOffMui,
  ErrorOutlineOutlined, ArrowDropDown as ArrowDropDownMUI, ChevronLeft as ChevronLeftMUI,
  ChevronRight as ChevronRightMUI, CalendarMonth as CalendarMonthMUI,
} from '@mui/icons-material';
import { AppColors } from '../../../styles';
import { AllCategoryIcons, CategoryIconProps, IconProps } from './interface';
import { categoryIcons } from './constants';

const DEFAULT_SIZE = '2.5rem';
const DEFAULT_SIZE_CLOSE_ICON = '3.5rem';

export const DeleteIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <DeleteOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.negative }} />
);

export const CategoryIcon = ({ size = DEFAULT_SIZE, icon }: CategoryIconProps) => {
  const Icon = categoryIcons[icon as keyof AllCategoryIcons];
  return (
    <Icon sx={{ fontSize: size, fill: AppColors.black }} />
  );
};

export const ErrorIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <ErrorOutlineOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.negative }} />
);

export const EditIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <EditOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.primary }} />
);

export const LogOutIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <LogoutOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.primary }} />
);

export const CloseIcon = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (
  <Close sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const GoToTopIcon = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (
  <KeyboardArrowUpOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const XMark = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (
  <Close sx={{ fontSize: size, fill: fillColor ?? AppColors.negative }} />
);

export const TickMark = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (
  <DoneOutlined sx={{ fontSize: size, fill: fillColor ?? AppColors.positive }} />
);

export const Visibility = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (
  <VisibilityMui sx={{ fontSize: size, fill: fillColor ?? AppColors.black }} />
);

export const VisibilityOff = ({ size = DEFAULT_SIZE_CLOSE_ICON, fillColor }: IconProps) => (
  <VisibilityOffMui sx={{ fontSize: size, fill: fillColor ?? AppColors.black }} />
);

/** Date Picker Icons */
export const CalendarMonthIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <CalendarMonthMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const ArrowDropDownIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <ArrowDropDownMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const ChevronLeftIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <ChevronLeftMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);

export const ChevronRightIcon = ({ size = DEFAULT_SIZE, fillColor }: IconProps) => (
  <ChevronRightMUI sx={{ fontSize: size, fill: fillColor ?? AppColors.grey }} />
);
