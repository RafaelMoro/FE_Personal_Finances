import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { SystemStateEnum } from '../../../enums';

export interface INotificationProps {
  title: string;
  description: string;
  status: SystemStateEnum;
  close: () => void;
  UIElement?: EmotionJSX.Element | null;
}
