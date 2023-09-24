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
    _id: accountId, title, amount, backgroundColor, color, accountType, selected,
  } = account;

  return (
    <AccountContainerColoroued
      backgroundColor={backgroundColor.color}
      color={color.color}
      selected={selected}
      onClick={selectAccountOnClick}
    >
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amount }</Paragraph>
      <AccountIconsContainer>
        <IconButton onClick={() => openModifyAccountModal(accountId)}>
          <EditIcon fillColor={color.color} />
        </IconButton>
        <IconButton onClick={() => openDeleteAccountModal(accountId, title)}>
          <DeleteIcon fillColor={color.color} />
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
