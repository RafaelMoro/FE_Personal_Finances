import { AccountType } from '../../../aliasType';
import { AccountBackgroundColorsKeys, AccountTextColorsKeys } from '../../../styles/interface';
import { IAccount } from '../../../globalInterface';

export interface IAccountUI extends IAccount {
  selected?: boolean;
}

export interface ICreateAccount {
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: AccountBackgroundColorsKeys;
  color: AccountTextColorsKeys;
}

// backgroundColor and color are string because in the Account component, the
// background color and color are transformed using the global config object.
export interface IAccountDynamicStylesProps {
  backgroundColor: string;
  color: string;
  selected: boolean;
}

export interface CreateAccountDialogProps {
  open: boolean;
  onClose: () => void;
}
