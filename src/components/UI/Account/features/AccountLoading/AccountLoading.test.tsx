import { render, screen } from '@testing-library/react';
import { AccountLoading } from './AccountLoading';

describe('<AccountLoading />', () => {
  test('Show account loading skeleton', () => {
    render(<AccountLoading />);
    expect(screen.getAllByTestId('account-loading-skeleton-placeholder')).toHaveLength(3);
    expect(screen.getByTestId('account-loading-skeleton')).toBeInTheDocument();
  });
});
