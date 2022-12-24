import { render, screen } from '@testing-library/react';
import { ResetPassword } from './ResetPassword';

describe('<ResetPassword />', () => {
  test('Render Reset Password page', () => {
    render(<ResetPassword />);

    expect(screen.getByRole('heading', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByText(/enter your new password in the fields below:/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });
});
