import { IconButton, Typography } from '@mui/material';

import { AppIcon } from '../Icons';
import { AccountComponentProps } from './Account.interface';
import {
  AccountContainerColoroued, AccountTitle, AccountIconsContainer, SelectedTextBox,
} from './Account.styled';

const Account = ({
  account,
  selectAccountOnClick,
  openModifyAccountModal,
  openDeleteAccountModal,
}: AccountComponentProps) => {
  const {
    _id: accountId, title, backgroundColorUI, accountType, selected, amountFormatted,
  } = account;

  return (
    <AccountContainerColoroued
      color={backgroundColorUI.color}
      selected={selected}
      onClick={selectAccountOnClick}
    >
      <AccountTitle variant="h4">{ title }</AccountTitle>
      <Typography>{ amountFormatted }</Typography>
      <AccountIconsContainer>
        <IconButton aria-label={`edit-button-account-${title}`} onClick={() => openModifyAccountModal(accountId)}>
          <AppIcon icon="Edit" fillColor={backgroundColorUI.color} />
        </IconButton>
        <IconButton aria-label={`delete-button-account-${title}`} onClick={() => openDeleteAccountModal(accountId, title)}>
          <AppIcon icon="Delete" fillColor={backgroundColorUI.color} />
        </IconButton>
      </AccountIconsContainer>
      <Typography>{ accountType }</Typography>
      { (selected) && (
        <SelectedTextBox backgroundColor={backgroundColorUI.color}>
          <Typography>Selected</Typography>
        </SelectedTextBox>
      ) }
    </AccountContainerColoroued>
  );
};

export { Account };
