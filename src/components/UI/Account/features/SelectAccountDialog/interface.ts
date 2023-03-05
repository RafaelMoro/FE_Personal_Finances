import { IAccount } from '../../../../../globalInterface';

export interface AccountDialogProps {
  open: boolean;
  selectedAccount: IAccount;
  onClose: (selectedAccount: IAccount) => void;
}

export interface IListAccountDynamicStylesProps {
  showSelectedAccount?: boolean;
}
