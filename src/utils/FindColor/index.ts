import { ITextColors, IBackgroundColors } from '../../styles/interface';
import { BackgroundColors, TextColors } from '../../styles';

interface IFindColor {
  colorName: string;
  findTextColor?: boolean;
}

export const findColor = ({
  findTextColor = false, colorName,
}: IFindColor): ITextColors | IBackgroundColors => {
  if (findTextColor) {
    const textColor = TextColors.find((color) => color.name === colorName);
    // Return a fallback color in case textColor is undefined
    if (!textColor) return { name: 'black', color: '#1D1305' };
    return textColor;
  }
  const bgColor = BackgroundColors.find((color) => color.name === colorName);
  // Return a fallback color in case bgColor is undefined
  if (!bgColor) return { name: 'white', color: '#fbfbfb' };
  return bgColor;
};
