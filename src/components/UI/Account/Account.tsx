import { IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { AccountComponentProps } from './interface';
import { BackgroundColors, TextColors, Paragraph } from '../../../styles';
import { AccountContainerColoroued, AccountTitle } from './Account.styled';

const Account = ({
  _id,
  title,
  amount,
  accountType,
  backgroundColor,
  color,
  selected = false,
  openModifyAccountModal,
}: AccountComponentProps) => {
  const newBgColor = BackgroundColors[backgroundColor];
  const newColor = TextColors[color];

  return (
    <AccountContainerColoroued backgroundColor={newBgColor} color={newColor} selected={selected}>
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amount }</Paragraph>
      <IconButton onClick={() => openModifyAccountModal(_id)}>
        <EditOutlined sx={{ fontSize: '2.5rem', fill: newColor }} />
      </IconButton>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
