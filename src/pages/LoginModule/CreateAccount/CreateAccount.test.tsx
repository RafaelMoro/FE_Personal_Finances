import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { CreateAccount } from './CreateAccount';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@mail.com',
  password: 'TestPassword1@',
  confirmPassword: 'TestPassword1@',
};

describe('<CreateAccount />', () => {
  const history = createMemoryHistory();

  let title: HTMLElement | null = null;
  let description: HTMLElement | null = null;

  // Inputs
  let firstNameInput: HTMLElement | null = null;
  let middleNameInput: HTMLElement | null = null;
  let lastNameInput: HTMLElement | null = null;
  let emailInput: HTMLElement | null = null;
  let passwordInput: HTMLElement | null = null;
  let confirmPasswordInput: HTMLElement | null = null;

  // Buttons
  let nextButton: HTMLElement | null = null;
  let cancelButton: HTMLElement | null = null;
  let returnButton: HTMLElement | null = null;
  let createAccountButton: HTMLElement | null = null;

  describe('Render all UI elements in Create Account page', () => {
    beforeEach(() => {
      render(
        <Router location={history.location} navigator={history}>
          <CreateAccount />
        </Router>,
      );
    });

    test.skip('Render first view with title, description, inputs: First name, middle name and last name, buttons: cancel and next', () => {
      title = screen.getByRole('heading', { name: /create account/i });
      description = screen.getByText(/fill the following information to create your account\./i);
      firstNameInput = screen.getByRole('textbox', { name: /first name/i });
      middleNameInput = screen.getByRole('textbox', { name: /middle name/i });
      lastNameInput = screen.getByRole('textbox', { name: /last name/i });
      nextButton = screen.getByRole('button', { name: /next/i });
      cancelButton = screen.getByRole('link', { name: /cancel/i });

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(firstNameInput).toBeInTheDocument();
      expect(middleNameInput).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test.skip(`Render second view with title, description, inputs:
    email, password and confirm password, buttons: return and create account`, async () => {
      firstNameInput = screen.getByRole('textbox', { name: /first name/i });
      lastNameInput = screen.getByRole('textbox', { name: /last name/i });
      nextButton = screen.getByRole('button', { name: /next/i });

      // Go to the next view.
      userEvent.type(firstNameInput, userData.firstName);
      userEvent.type(lastNameInput, userData.lastName);
      fireEvent.click(nextButton);

      await waitFor(() => {
        title = screen.getByRole('heading', { name: /create account/i });
        description = screen.getByText(/fill the following information to create your account\./i);
        emailInput = screen.getByRole('textbox', { name: /email/i });
        passwordInput = screen.getByRole('textbox', { name: /email/i });
        confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        createAccountButton = screen.getByRole('button', { name: /create account/i });
        returnButton = screen.getByRole('button', { name: /return/i });

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(returnButton).toBeInTheDocument();
        expect(createAccountButton).toBeInTheDocument();
      });
    });

    test.skip('Render the third view LoadingCreateAccount component', async () => {
      firstNameInput = screen.getByRole('textbox', { name: /first name/i });
      lastNameInput = screen.getByRole('textbox', { name: /last name/i });
      nextButton = screen.getByRole('button', { name: /next/i });

      // Go to the next view.
      userEvent.type(firstNameInput, userData.firstName);
      userEvent.type(lastNameInput, userData.lastName);
      fireEvent.click(nextButton);

      // WIP
      await waitFor(async () => {
        emailInput = screen.getByRole('textbox', { name: /email/i });
        passwordInput = screen.getByRole('textbox', { name: /email/i });
        confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        createAccountButton = screen.getByRole('button', { name: /create account/i });

        userEvent.type(emailInput, userData.email);
        userEvent.type(passwordInput, userData.password);
        userEvent.type(confirmPasswordInput, userData.confirmPassword);

        fireEvent.click(createAccountButton);
      });
    });
  });
});
