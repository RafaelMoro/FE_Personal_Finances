import { render, screen } from '@testing-library/react';

import { Account } from './Account';

describe('<Account />', () => {
  test('Render account name, price, account type', () => {
    render(<Account />);

    expect(screen.getByText('BBVA')).toBeInTheDocument();
    expect(screen.getByText('$20,000')).toBeInTheDocument();
    expect(screen.getByText('Debit')).toBeInTheDocument();
  });
});
