import { ModalAction } from '../../../aliasType';
import { Account } from '../../../globalInterface';
import { BackgroundColors, TextColors } from '../../../styles/interface';

export interface AccountUI extends Account {
  amountFormatted: string;
  backgroundColorUI: BackgroundColors;
  colorUI: TextColors;
  selected: boolean;
}

export interface AccountComponentProps {
  account: AccountUI;
  openModifyAccountModal: (id: string) => void;
  openDeleteAccountModal: (id: string, accountName: string) => void;
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
  accountAction: ModalAction;
  account: AccountUI | null;
}
