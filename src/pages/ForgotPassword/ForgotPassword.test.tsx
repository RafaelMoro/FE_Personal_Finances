import { render, screen } from '@testing-library/react';
import { ForgotPassword } from './ForgotPassword';

describe('<ForgotPassword />', () => {
  test('Render Forgot Password page with title, description, input and button', () => {
    render(<ForgotPassword />);

    expect(screen.getByRole('heading', { name: /forgot password/i })).toBeInTheDocument();
    expect(screen.getByText(/if you forgot your password, please enter your email and we will send you an email to reset your password\./i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change my password/i })).toBeInTheDocument();
  });
});
