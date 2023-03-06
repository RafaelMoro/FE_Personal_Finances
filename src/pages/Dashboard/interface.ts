import { SystemStateEnum } from '../../enums';

export interface DashboardNotificationFunctions {
  updateTitle: (newTitle: string) => void;
  updateDescription: (newDescription: string) => void;
  updateStatus: (newStatus: SystemStateEnum) => void;
  toggleShowNotification: () => void;
}
