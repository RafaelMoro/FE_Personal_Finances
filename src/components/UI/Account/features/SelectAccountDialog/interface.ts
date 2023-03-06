import { AccountUI } from '../../interface';

export interface AccountDialogProps {
  open: boolean;
  selectedAccount: AccountUI;
  onClose: (selectedAccount: AccountUI) => void;
}

export interface IListAccountDynamicStylesProps {
  showSelectedAccount?: boolean;
}
