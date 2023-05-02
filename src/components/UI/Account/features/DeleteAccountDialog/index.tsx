import {
  Dialog,
} from '@mui/material';
import { DeleteAccountDialogProps } from './interface';
import { DialogTitle, Paragraph } from '../../../../../styles';

const DeleteAccountDialog = ({
  open, onClose,
}: DeleteAccountDialogProps) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>Delete Account</DialogTitle>
    <Paragraph>Are you sure you want to delete the account X?</Paragraph>
  </Dialog>
);

export { DeleteAccountDialog };
