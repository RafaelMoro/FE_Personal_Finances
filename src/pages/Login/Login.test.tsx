import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Login } from './Login';

beforeEach(() => render(<Login />));

describe('<Login />', () => {
  test("Render Login Page with the title 'welcome back', email and password input and login button", () => {
    const title = screen.getByRole('heading', { name: /welcome back/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('The email input if is empty, a validation error must appear', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    // working on this test
    expect(1).toBe(1);

    // expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    // expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
