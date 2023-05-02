import {
  Dialog,
} from '@mui/material';
import { DeleteAccountDialogProps } from './interface';
import { AccountDialogContainer, DialogParagraph } from './DeleteAccountDialog.styled';
import {
  DialogTitle, SecondaryButton, CancelButton,
} from '../../../../../styles';

const DeleteAccountDialog = ({
  open, onClose,
}: DeleteAccountDialogProps) => {
  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('dio click que si');
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Delete Account</DialogTitle>
      <AccountDialogContainer>
        <DialogParagraph>THERE IS NO WAY OF RECOVERING YOUR ACCOUNT.</DialogParagraph>
        <DialogParagraph>Are you sure you want to delete the account X?</DialogParagraph>
        <SecondaryButton variant="contained" size="medium" onClick={onClose}>Go Back</SecondaryButton>
        <CancelButton variant="contained" onClick={handleSubmit} size="medium">Cancel Account</CancelButton>
      </AccountDialogContainer>
    </Dialog>
  );
};

export { DeleteAccountDialog };
