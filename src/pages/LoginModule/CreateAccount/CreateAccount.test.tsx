import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { CreateAccount } from './CreateAccount';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<CreateAccount />', () => {
  const history = createMemoryHistory();
  test('Render create account page with title, description. First name, middle name and last name inputs, cancel and next button', () => {
    render(
      <Router location={history.location} navigator={history}>
        <CreateAccount />
      </Router>,
    );
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
    const middleNameInput = screen.getByRole('textbox', { name: /middle name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
    const nextButton = screen.getByRole('button', { name: /next/i });
    const cancelButton = screen.getByRole('link', { name: /cancel/i });

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByText(/fill the following information to create your account\./i)).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(middleNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
