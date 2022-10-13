import { SystemStateEnum } from '../../../enums';

export interface INotificationProps {
  title: string;
  description: string;
  status: SystemStateEnum
  close: () => void;
}
