import { IAccount } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { AccountContainerColoroued, AccountTitle } from './Account.styled';
import { Paragraph } from '../../../styles';

const Account = ({
  title, amount, accountType, bgColor, color, selected = false,
}: IAccount) => {
  const amountFormatted: string = formatNumberToCurrency(amount);

  return (
    <AccountContainerColoroued bgColor={bgColor} color={color} selected={selected}>
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amountFormatted }</Paragraph>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
