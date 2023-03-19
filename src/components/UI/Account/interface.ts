import { AccountAction } from '../../../aliasType';
import { Account } from '../../../globalInterface';
import { DashboardNotificationFunctions } from '../../../pages/Dashboard/interface';

export interface AccountUI extends Omit<Account, 'amount'> {
  amount: string;
  selected: boolean;
}

export interface AccountComponentProps {
  account: AccountUI;
  openModifyAccountModal: (id: string) => void;
  selectAccountOnClick: () => void;
}

export type CreateAccount = Omit<Account, '_id'>;

// backgroundColor and color are string because in the Account component, the
// background color and color are transformed using the global config object.
export interface IAccountDynamicStylesProps {
  backgroundColor: string;
  color: string;
  selected: boolean;
}

export interface AccountDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardNotificationFunctions: DashboardNotificationFunctions;
  accountAction: AccountAction;
  account: Account | null;
}
