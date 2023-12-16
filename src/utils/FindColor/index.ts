import { TextColors, BackgroundColors } from '../../styles/interface';
import { AllBackgroundColors, AllTextColors } from '../../styles';

interface FindColorProps {
  colorName: string;
  findTextColor?: boolean;
}

export const findColor = ({
  findTextColor = false, colorName,
}: FindColorProps): TextColors | BackgroundColors => {
  if (findTextColor) {
    const textColor = AllTextColors.find((color) => color.name.toLowerCase() === colorName.toLowerCase());

    // Return a fallback color in case textColor is undefined
    if (!textColor) return { name: 'black', color: '#1D1305' };
    return textColor;
  }

  const bgColor = AllBackgroundColors.find((color) => color.name.toLowerCase() === colorName.toLowerCase());

  // Return a fallback color in case bgColor is undefined
  if (!bgColor) return { name: 'white', color: '#fbfbfb' };
  return bgColor;
};
