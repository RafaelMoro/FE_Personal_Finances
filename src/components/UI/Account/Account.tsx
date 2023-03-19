import { IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { AccountComponentProps } from './interface';
import { BackgroundColors, TextColors, Paragraph } from '../../../styles';
import { AccountContainerColoroued, AccountTitle } from './Account.styled';

const Account = ({
  account,
  selectAccountOnClick,
  openModifyAccountModal,
}: AccountComponentProps) => {
  const {
    _id: accountId, title, amount, backgroundColor, color, accountType, selected,
  } = account;
  const newBgColor = BackgroundColors[backgroundColor];
  const newColor = TextColors[color];

  return (
    <AccountContainerColoroued
      backgroundColor={newBgColor}
      color={newColor}
      selected={selected}
      onClick={selectAccountOnClick}
    >
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amount }</Paragraph>
      <IconButton onClick={() => openModifyAccountModal(accountId)}>
        <EditOutlined sx={{ fontSize: '2.5rem', fill: newColor }} />
      </IconButton>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
