import { ElementType } from 'react';

export interface IconProps {
  size?: string;
  fillColor?: string;
}

export interface AllCategoryIcons {
  fastFood: ElementType;
}

export type IconKeys = keyof AllCategoryIcons;

export interface CategoryIconProps extends IconProps {
  icon: IconKeys;
}
