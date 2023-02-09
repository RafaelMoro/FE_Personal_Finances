import { IAccountProps } from './interface';

const Account = ({ title, amount, accountType }: IAccountProps) => (
  <section>
    <h4>{ title }</h4>
    <p>
      $
      { amount }
    </p>
    <p>{ accountType }</p>
  </section>
);

export { Account };
