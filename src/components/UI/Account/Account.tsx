import { IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { AccountComponentProps } from './interface';
import { Paragraph } from '../../../styles';
import { AccountContainerColoroued, AccountTitle } from './Account.styled';

const Account = ({
  account,
  selectAccountOnClick,
  openModifyAccountModal,
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
      <IconButton onClick={() => openModifyAccountModal(accountId)}>
        <EditOutlined sx={{ fontSize: '2.5rem', fill: color.color }} />
      </IconButton>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
