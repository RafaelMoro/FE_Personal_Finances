import { IAccountUI } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { BackgroundColors, TextColors, Paragraph } from '../../../styles';
import { AccountContainerColoroued, AccountTitle } from './Account.styled';

const Account = ({
  title, amount, accountType, backgroundColor, color, selected = false,
}: IAccountUI) => {
  const amountFormatted: string = formatNumberToCurrency(amount);
  const newBgColor = BackgroundColors[backgroundColor];
  const newColor = TextColors[color];

  return (
    <AccountContainerColoroued backgroundColor={newBgColor} color={newColor} selected={selected}>
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amountFormatted }</Paragraph>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
