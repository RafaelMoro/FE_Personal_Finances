import { render, screen } from '@testing-library/react';
import { ForgotPassword } from './ForgotPassword';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<ForgotPassword />', () => {
  test('Render Forgot Password page with title, description, input and button', () => {
    render(<ForgotPassword />);

    expect(screen.getByRole('heading', { name: /forgot password/i })).toBeInTheDocument();
    expect(screen.getByText(/please enter your email and we will send you the instructions to reset your password\./i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change my password/i })).toBeInTheDocument();
  });
});
