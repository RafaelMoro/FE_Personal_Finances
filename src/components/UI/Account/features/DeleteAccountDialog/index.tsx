/* eslint-disable no-console */
import {
  Dialog, IconButton,
} from '@mui/material';
import { AxiosError, AxiosRequestHeaders } from 'axios';

import { SystemStateEnum } from '../../../../../enums';
import { DeleteAccountDialogProps } from './interface';
import { AccountDialogContainer, DialogParagraph } from './DeleteAccountDialog.styled';
import {
  DialogTitle, SecondaryButton, CancelButton, FlexContainer,
} from '../../../../../styles';
import { useNotification } from '../../../../../hooks/useNotification';
import { CloseIcon } from '../../../Icons';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { DeleteAccountThunkProps } from '../../../../../redux/slices/Accounts/interface';
import { deleteAccount } from '../../../../../redux/slices/Accounts/deleteAccount';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';

const DeleteAccountDialog = ({
  open, onClose, accountId, accountName,
}: DeleteAccountDialogProps) => {
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as AxiosRequestHeaders;

  const { updateGlobalNotification } = useNotification();

  const handleSubmit = async () => {
    try {
      const deleteAccountThunkProps: DeleteAccountThunkProps = { values: { accountId }, bearerToken };
      await dispatch(deleteAccount(deleteAccountThunkProps)).unwrap();

      // Show success notification
      updateGlobalNotification({
        newTitle: `Account ${accountName} deleted`,
        newDescription: '',
        newStatus: SystemStateEnum.Success,
      });
      onClose();
    } catch (err) {
      const errorCatched = err as AxiosError;
      console.group();
      console.error('Error on deleting account');
      console.error(errorCatched);
      console.groupEnd();
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
      <FlexContainer justifyContent="end" padding="1rem">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </FlexContainer>
      <DialogTitle>Delete Account</DialogTitle>
      <AccountDialogContainer>
        <DialogParagraph>THERE IS NO WAY OF RECOVERING YOUR ACCOUNT.</DialogParagraph>
        <DialogParagraph>
          Are you sure you want to delete the account
          {' '}
          {accountName}
          ?
        </DialogParagraph>
        <SecondaryButton variant="contained" size="medium" onClick={onClose}>Go Back</SecondaryButton>
        <CancelButton variant="contained" onClick={handleSubmit} size="medium">Delete Account</CancelButton>
      </AccountDialogContainer>
    </Dialog>
  );
};

export { DeleteAccountDialog };
