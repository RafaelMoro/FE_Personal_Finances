import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Record } from './Record';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import {
  accountsInitialState, mockExpense, mockExpenseTransfer, mockIncome,
} from './Record.mocks';

describe('<Records />', () => {
  test('Show expense record in Mobile', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockExpense}
          backgroundColor={backgroundColor}
        />
      </Router>,
    );

    expect(screen.getByText(/casa a solesta gym/i)).toBeInTheDocument();
    expect(screen.getByText(/esta es una descripcion muy larga para darme una i.../i)).toBeInTheDocument();
    expect(screen.getByText(/- \$150\.09/i)).toBeInTheDocument();
    expect(screen.getByText(/may 20/i)).toBeInTheDocument();
    expect(screen.getByText(/12:34pm/i)).toBeInTheDocument();
    expect(screen.getByText(/no budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/no tags/i)).toBeInTheDocument();
  });

  test('Do not show unpaid badge in record with non credit account', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockExpense}
          backgroundColor={backgroundColor}
        />
      </Router>,
    );

    // Do not show any paid status badge
    expect(screen.queryByText(/unpaid/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^paid/i)).not.toBeInTheDocument();
  });

  test('Show unpaid badge in record with credit account', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockExpense}
          backgroundColor={backgroundColor}
        />
      </Router>,
      { preloadedState: { accounts: accountsInitialState } },
    );

    // Show unpaid badge and do not show paid status badge
    expect(screen.getByText(/unpaid/i)).toBeInTheDocument();
    expect(screen.queryByText(/^paid/i)).not.toBeInTheDocument();
  });

  test('Show income record in Mobile', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockIncome}
          backgroundColor={backgroundColor}
        />
      </Router>,
    );

    expect(screen.getByText(/solesta gym a casa/i)).toBeInTheDocument();
    expect(screen.getByText(/didi para ir a casa/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ \$110\.24/i)).toBeInTheDocument();
    expect(screen.getByText(/may 20/i)).toBeInTheDocument();
    expect(screen.getByText(/1:50pm/i)).toBeInTheDocument();
    expect(screen.getByText(/no budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/no tags/i)).toBeInTheDocument();
    expect(screen.getByText(/records paid: 2/i)).toBeInTheDocument();
  });

  test('Show transfer expense record in Mobile', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockExpenseTransfer}
          backgroundColor={backgroundColor}
        />
      </Router>,
    );

    expect(screen.getByText(/Payment$/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment to credit card/i)).toBeInTheDocument();
    expect(screen.getByText('- $76.00')).toBeInTheDocument();
    expect(screen.getByText(/sat, jun 29/i)).toBeInTheDocument();
    expect(screen.getByText(/10:25pm/i)).toBeInTheDocument();
    expect(screen.getByText(/no budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/no tags/i)).toBeInTheDocument();
    expect(screen.getByText(/transfer/i)).toBeInTheDocument();
  });
});
