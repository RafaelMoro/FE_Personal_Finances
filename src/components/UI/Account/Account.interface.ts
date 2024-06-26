import { MutableRefObject } from 'react';
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

export interface CreateAccountInitialValues extends Omit<Account, '_id' | '__v' | 'amount' | 'color'> {
  amount: string;
}

export interface CreateAccount extends Omit<Account, '_id' | '__v' | 'amount'> {
  amount: number;
}

export interface ModifyAccountInitialValues extends Omit<AccountUI, 'amount'> {
  amount: string;
}

export interface ModifyAccountValues extends Omit<Account, '_id' | '__v'> {
  accountId: string;
}

// backgroundColor and color are string because in the Account component, the
// background color and color are transformed using the global config object.
export interface AccountDynamicStylesProps {
  color: string;
  selected: boolean;
}

export interface AccountDialogProps {
  open: boolean;
  onClose: () => void;
  accountAction: ModalAction;
  account: AccountUI | null;
}

export interface AccountToBeDeleted {
  accountId: string;
  accountName: string;
}

export interface AccountActions {
  accountAction: ModalAction;
  openAccountModal: boolean;
  openChangeToOtherAccountModal: boolean;
  modifyAccount: AccountUI | null;
  openDeleteAccountModal: boolean;
  accountToBeDeleted: MutableRefObject<AccountToBeDeleted>;
  handleCloseAccountModal: () => void;
  handleOpenCreateAccount: () => void;
  handleOpenModifyAccount: (accountId: string) => void;
  toggleChangeOtherAccountModal: () => void;
  handleCloseDeleteAccount: () => void;
  handleOpenDeleteAccount: (accountId: string, accountName: string) => void;
}

export interface AddAccountProps {
  onClick: () => void;
}

export interface ViewAccountsProps {
  hide: boolean | null;
  accountsActions: AccountActions;
}

export interface ViewAccountsStylesProps {
  hide: boolean | null;
}
