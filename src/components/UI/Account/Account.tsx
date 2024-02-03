import { IconButton } from '@mui/material';

import { EditIcon, DeleteIcon } from '../Icons';
import { AccountComponentProps } from './interface';
import { Paragraph } from '../../../styles';
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
    _id: accountId, title, backgroundColorUI, colorUI, accountType, selected, amountFormatted,
  } = account;

  return (
    <AccountContainerColoroued
      backgroundColor={backgroundColorUI.color}
      color={colorUI.color}
      selected={selected}
      onClick={selectAccountOnClick}
    >
      <AccountTitle variant="h4">{ title }</AccountTitle>
      <Paragraph>{ amountFormatted }</Paragraph>
      <AccountIconsContainer>
        <IconButton onClick={() => openModifyAccountModal(accountId)}>
          <EditIcon fillColor={colorUI.color} />
        </IconButton>
        <IconButton onClick={() => openDeleteAccountModal(accountId, title)}>
          <DeleteIcon fillColor={colorUI.color} />
        </IconButton>
      </AccountIconsContainer>
      <Paragraph>{ accountType }</Paragraph>
      { (selected) && (
        <SelectedTextBox>
          <Paragraph>Selected</Paragraph>
        </SelectedTextBox>
      ) }
    </AccountContainerColoroued>
  );
};

export { Account };
