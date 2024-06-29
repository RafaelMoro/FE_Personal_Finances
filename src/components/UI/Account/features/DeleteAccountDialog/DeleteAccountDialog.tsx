/* eslint-disable no-console */
import {
  Dialog,
} from '@mui/material';

import { useNotification } from '../../../../../hooks/useNotification';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { SystemStateEnum } from '../../../../../enums';
import { DeleteAccountDialogProps } from './DeleteAccountDialog.interface';
import { AppIcon } from '../../../Icons';
import { DeleteAccountMutationProps } from '../../../../../redux/slices/Accounts/interface';
import { useAppSelector } from '../../../../../redux/hooks';
import { useDeleteAccountMutation } from '../../../../../redux/slices/Accounts/actions';
import {
  AccountDialogContainer, DeleteAccountIconButton, DeleteAccountTitle, DialogParagraph, DialogParagraphWarning,
} from './DeleteAccountDialog.styled';
import {
  SecondaryButton, CancelButton,
} from '../../../../../styles';
import { LoadingSpinner } from '../../../LoadingSpinner';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { useAccount } from '../../../../../hooks/useAccount';

const DeleteAccountDialog = ({
  open, onClose, accountId, accountName,
}: DeleteAccountDialogProps) => {
  const [deleteAccountMutation, { isLoading }] = useDeleteAccountMutation();
  const { deleteAccountLocalStorage } = useAccount();
  const { isGuestUser } = useGuestUser();
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;

  const { updateGlobalNotification } = useNotification();

  const handleSubmit = async () => {
    try {
      const deleteAccountMutationProps: DeleteAccountMutationProps = { values: { accountId }, bearerToken };

      if (isGuestUser) {
        deleteAccountLocalStorage(accountId);
        updateGlobalNotification({
          newTitle: `Account ${accountName} deleted`,
          newDescription: '',
          newStatus: SystemStateEnum.Success,
        });
        onClose();
        return;
      }

      await deleteAccountMutation(deleteAccountMutationProps);

      // Show success notification
      updateGlobalNotification({
        newTitle: `Account ${accountName} deleted`,
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });
      onClose();
    } catch (err) {
      updateGlobalNotification({
        newTitle: `Error deleting ${accountName}`,
        newDescription: ERROR_MESSAGE_GENERAL,
        newStatus: SystemStateEnum.Error,
      });
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <AccountDialogContainer>
        <DeleteAccountTitle variant="h4">Delete Account</DeleteAccountTitle>
        <DeleteAccountIconButton onClick={onClose}>
          <AppIcon icon="Close" />
        </DeleteAccountIconButton>
        <DialogParagraphWarning>THERE IS NO WAY OF RECOVERING YOUR ACCOUNT.</DialogParagraphWarning>
        <DialogParagraph>
          Are you sure you want to delete the account
          {' '}
          {accountName}
          ?
        </DialogParagraph>
        <SecondaryButton variant="contained" size="medium" onClick={onClose}>Go Back</SecondaryButton>
        <CancelButton disabled={isLoading} variant="contained" onClick={handleSubmit} size="medium">
          { (isLoading) ? (<LoadingSpinner />) : 'Delete Account' }
        </CancelButton>
      </AccountDialogContainer>
    </Dialog>
  );
};

export { DeleteAccountDialog };
