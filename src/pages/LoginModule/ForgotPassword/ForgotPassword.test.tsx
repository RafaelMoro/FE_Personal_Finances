import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ForgotPassword } from './ForgotPassword';
import { WrapperRedux } from '../../../tests/WrapperRedux';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Reset password page tests', () => {
  test('Show Forgot Password page with title, description, an input to put an email, cancel and send buttons', () => {
    const history = createMemoryHistory();
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>
      </WrapperRedux>,
    );

    expect(screen.getByRole('heading', { name: /forgot password/i })).toBeInTheDocument();
    expect(screen.getByText(/please enter your email and we will send you the instructions to reset your password\./i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  describe('Validations of the email input', () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;

    beforeEach(() => {
      const history = createMemoryHistory();
      render(
        <WrapperRedux>
          <Router location={history.location} navigator={history}>
            <ForgotPassword />
          </Router>
        </WrapperRedux>,
      );
    });

    test('When the user leaves the email input empty, then he clicks the button, a required email error should appear', async () => {
      emailInput = screen.getByRole('textbox', { name: /email/i });
      changePasswordButton = screen.getByRole('button', { name: /send/i });

      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(emailInput).toBeInTheDocument();
        const error = screen.getByText(/email is required/i);
        expect(error).toBeInTheDocument();
      });
    });

    test('When the user enters an invalid email, then he clicks on the button send, an invalid email error should appear', async () => {
      emailInput = screen.getByRole('textbox', { name: /email/i });
      changePasswordButton = screen.getByRole('button', { name: /send/i });

      userEvent.type(emailInput, 'a');
      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    });

    // This form will always return successfull return due user security.
    test.skip('Submit the form and have a successful return', async () => {
      const email = 'example@mail.com';
      emailInput = screen.getByRole('textbox', { name: /email/i });
      changePasswordButton = screen.getByRole('button', { name: /change my password/i });
      // Mock the response

      userEvent.type(emailInput, email);
      userEvent.click(changePasswordButton);

      await waitFor(() => {
        // expect the mock to be called.
      });
    });
  });
});
