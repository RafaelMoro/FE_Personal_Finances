import { AccountActions } from '../../Account.interface';

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
