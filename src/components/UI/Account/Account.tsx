import { IAccountProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { AccountContainer, AccountTitle, AccountSkeletonHolder } from './Account.styled';
import { Paragraph } from '../../../styles';

const Account = ({
  title, amount, accountType, bgColor, color, selected = false, loading = false,
}: IAccountProps) => {
  const amountFormatted: string = formatNumberToCurrency(amount);

  return (
    <AccountContainer bgColor={bgColor} color={color} selected={selected} loading={loading}>
      { loading && (
        <>
          <AccountSkeletonHolder />
          <AccountSkeletonHolder />
          <AccountSkeletonHolder />
        </>
      ) }
      { !loading && (
        <>
          <AccountTitle>{ title }</AccountTitle>
          <Paragraph>{ amountFormatted }</Paragraph>
          <Paragraph>{ accountType }</Paragraph>
        </>
      ) }

    </AccountContainer>
  );
};

export { Account };
