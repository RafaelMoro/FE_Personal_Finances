import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import { ForgotPassword } from './ForgotPassword';
import { WrapperRedux } from '../../../tests/WrapperRedux';
import { LANDING_ROUTE } from '../../RoutesConstants';

const successfulResponse = {
  version: '2.0.0',
  success: true,
  message: 'Email sent',
  data: null,
  error: null,
};
const userNotFoundResponse = {
  version: '2.0.0',
  success: false,
  message: null,
  data: null,
  error: {
    statusCode: 400,
    message: 'User not found.',
    error: 'Bad Request',
  },
};

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
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
  });

  test(`The user enters a non registered email,
  then show a notification where the email is not registered and show create account button.`, async () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;
    const email = 'example@mail.com';

    const history = createMemoryHistory();
    fetchMock.mockRejectedValueOnce(JSON.stringify(userNotFoundResponse));
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>
      </WrapperRedux>,
    );
    emailInput = screen.getByRole('textbox', { name: /email/i });
    changePasswordButton = screen.getByRole('button', { name: /send/i });

    userEvent.type(emailInput, email);
    userEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      const notificationText = screen.getByText("We don't have any email associated to an account.");
      const createAccountButton = screen.getByRole('button', { name: /create account/i });
      expect(notificationText).toBeInTheDocument();
      expect(createAccountButton).toBeInTheDocument();
    });
  });

  test('The user enters a registered email, then the email sent notification is shown.', async () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;
    const email = 'example@mail.com';

    const history = createMemoryHistory();
    fetchMock.once(JSON.stringify(successfulResponse));
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>
      </WrapperRedux>,
    );
    emailInput = screen.getByRole('textbox', { name: /email/i });
    changePasswordButton = screen.getByRole('button', { name: /send/i });

    userEvent.type(emailInput, email);
    userEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      const successNotification = screen.getByRole('heading', { name: /email sent/i });
      expect(successNotification).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(LANDING_ROUTE);
    }, {
      timeout: 4000,
    });
  });
});
