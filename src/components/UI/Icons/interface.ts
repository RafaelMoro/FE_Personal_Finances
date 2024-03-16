import { ElementType } from 'react';

export interface IconProps {
  size?: string;
  fillColor?: string;
  icon: AppIconKeys;
}

export interface AppIcon {
  icon: ElementType;
  defaultColor: string;
}

export interface AppIcons {
  Delete: AppIcon;
  Error: AppIcon;
  Edit: AppIcon;
  LogOut: AppIcon;
  Close: AppIcon;
  GoToTop: AppIcon;
  TickMark: AppIcon;
  Visibility: AppIcon;
  VisibilityOff: AppIcon;
}

export type AppIconKeys = keyof AppIcons;

export interface AllCategoryIcons {
  foodAndDrink: ElementType;
  house: ElementType;
  utilities: ElementType;
  subcriptions: ElementType;
  transportation: ElementType;
  debtAndLoans: ElementType;
  healthCare: ElementType;
  kids: ElementType;
  shopping: ElementType;
  entertainment: ElementType;
  savings: ElementType;
}

export type IconKeys = keyof AllCategoryIcons;

export interface CategoryIconProps {
  size?: string;
  icon: IconKeys;
}
