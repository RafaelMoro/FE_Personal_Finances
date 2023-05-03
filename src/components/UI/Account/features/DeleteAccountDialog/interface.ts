import { DashboardNotificationFunctions } from '../../../../../pages/Dashboard/interface';

export interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
  dashboardNotificationFunctions: DashboardNotificationFunctions;
}
