import { IAccountProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';

const Account = ({ title, amount, accountType }: IAccountProps) => {
  const amountFormatted = formatNumberToCurrency(amount);

  return (
    <section>
      <h4>{ title }</h4>
      <p>{ amountFormatted }</p>
      <p>{ accountType }</p>
    </section>
  );
};

export { Account };
