import { render, screen } from '@testing-library/react';
import { NoAccountsFound } from './NoAccountsFound';

describe('<NoAccountsFound />', () => {
  test('When the user has no accounts, show an image, create account button and text indicating that no accounts were found', () => {
    const handleOpenCreateAccount = jest.fn();
    render(<NoAccountsFound handleOpenCreateAccount={handleOpenCreateAccount} />);

    const picture = screen.getByAltText('No Accounts Found');
    const message = screen.getByText('You have not created accounts yet. Start now!');
    const button = screen.getByRole('button', { name: 'Create account' });

    expect(picture).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
