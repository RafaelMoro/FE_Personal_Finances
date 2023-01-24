import { render, screen } from '@testing-library/react';
import { CreateAccount } from './CreateAccount';

describe('<CreateAccount />', () => {
  test('Render create account page with title, description, inputs and button', () => {
    render(<CreateAccount />);

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByText(/fill the following information to create your account\./i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});
