import { Account } from '../../../../components/UI';
import { IViewAccountsProps } from './interface';
import {
  AccountSection, AccountsTitle, ChangeAccountButton, AccountsContainer,
} from './ViewAccounts.styled';

const ViewAccounts = ({ selectedAccount, handleClickOpen }: IViewAccountsProps) => (
  <AccountSection>
    <AccountsTitle>Account: </AccountsTitle>
    <ChangeAccountButton variant="contained" size="medium" onClick={handleClickOpen}>Change account</ChangeAccountButton>
    <AccountsContainer>
      <Account
        id={selectedAccount.id}
        title={selectedAccount.title}
        amount={selectedAccount.amount}
        accountType={selectedAccount.accountType}
        bgColor={selectedAccount.bgColor}
        color={selectedAccount?.color ?? 'white'}
        selected
      />
    </AccountsContainer>
  </AccountSection>
);

export { ViewAccounts };
