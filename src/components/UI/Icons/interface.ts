import { ElementType } from 'react';

export interface IconProps {
  size?: string;
  fillColor?: string;
}

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
