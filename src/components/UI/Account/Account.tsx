import { IAccountProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { AccountContainer, AccountTitle } from './Account.styled';
import { Paragraph } from '../../../styles';

const Account = ({
  title, amount, accountType, bgColor, color,
}: IAccountProps) => {
  const amountFormatted: string = formatNumberToCurrency(amount);

  return (
    <AccountContainer bgColor={bgColor} color={color}>
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amountFormatted }</Paragraph>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainer>
  );
};

export { Account };
