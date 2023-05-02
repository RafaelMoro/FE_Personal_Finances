export interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
}
