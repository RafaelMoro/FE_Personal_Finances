import { SystemStateEnum } from '../../../../../enums';

export interface IViewAccountsProps {
  updateGlobalTitle: (newTitle: string) => void;
  updateGlobalDescription: (newDescription: string) => void;
  updateGlobalStatus: (newStatus: SystemStateEnum) => void;
  toggleShowNotification: () => void;
}
