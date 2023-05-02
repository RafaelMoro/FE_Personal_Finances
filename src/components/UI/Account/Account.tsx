import { IconButton } from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';

import { AccountComponentProps } from './interface';
import { Paragraph } from '../../../styles';
import { AccountContainerColoroued, AccountTitle, AccountIconsContainer } from './Account.styled';

const Account = ({
  account,
  selectAccountOnClick,
  openModifyAccountModal,
}: AccountComponentProps) => {
  const {
    _id: accountId, title, amount, backgroundColor, color, accountType, selected,
  } = account;

  const myFn = () => {
    // eslint-disable-next-line no-console
    console.log('dio click en delete icon');
  };

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
          <EditOutlined sx={{ fontSize: '2.5rem', fill: color.color }} />
        </IconButton>
        <IconButton onClick={() => myFn()}>
          <DeleteOutlined sx={{ fontSize: '2.5rem', fill: color.color }} />
        </IconButton>
      </AccountIconsContainer>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
