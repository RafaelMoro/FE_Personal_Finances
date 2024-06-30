import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { Record } from './Record';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import {
  accountsInitialState, getMockExpense, mockExpense, mockExpenseTransfer, mockIncome,
  mockIncomeTransfer,
} from './Record.mocks';

describe('<Records />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

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

  test('Show expense record in Drawer on Mobile', async () => {
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

    const record = screen.getByTestId('record');
    userEvent.click(record);

    await screen.findByTestId('record-drawer');
    expect(screen.getAllByText(/casa a solesta gym/i).length).toBe(2);
    expect(
      screen.getByText(
        /Esta es una descripcion muy larga para darme una idea de cuanto debo de cortar aproximadamente para la vista corta y la vista larga/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/- \$150\.09/i).length).toBe(2);
    expect(screen.getAllByText(/may 20/i).length).toBe(2);
    expect(screen.getAllByText(/12:34pm/i).length).toBe(2);
  });

  test('Do not show unpaid badge in record with non credit account', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    const expense = getMockExpense({ paidStatus: false });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={expense}
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
    const expense = getMockExpense({ paidStatus: false });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={expense}
          backgroundColor={backgroundColor}
        />
      </Router>,
      { preloadedState: { accounts: accountsInitialState } },
    );

    // Show unpaid badge and do not show paid status badge
    expect(screen.getByText(/unpaid/i)).toBeInTheDocument();
    expect(screen.queryByText(/^paid/i)).not.toBeInTheDocument();
  });

  test('Show paid badge in record with credit account', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    const expense = getMockExpense({ paidStatus: true });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={expense}
          backgroundColor={backgroundColor}
        />
      </Router>,
      { preloadedState: { accounts: accountsInitialState } },
    );

    // Show unpaid badge and do not show paid status badge
    expect(screen.queryByText(/unpaid/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^paid/i)).toBeInTheDocument();
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
    expect(screen.getByText(/may 21/i)).toBeInTheDocument();
    expect(screen.getByText(/1:50pm/i)).toBeInTheDocument();
    expect(screen.getByText(/no budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/no tags/i)).toBeInTheDocument();
    expect(screen.getByText(/records paid: 2/i)).toBeInTheDocument();
  });

  test('Show income record in Drawer on Mobile', async () => {
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

    const record = screen.getByTestId('record');
    userEvent.click(record);

    await screen.findByTestId('record-drawer');
    expect(screen.getAllByText(/solesta gym a casa/i).length).toBe(2);
    expect(screen.getAllByText(/didi para ir a casa/i).length).toBe(2);
    expect(screen.getAllByText(/\+ \$110\.24/i).length).toBe(2);
    expect(screen.getAllByText(/may 21/i).length).toBe(2);
    expect(screen.getAllByText(/1:50pm/i).length).toBe(2);
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

  test('Show transfer income record in Mobile', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockIncomeTransfer}
          backgroundColor={backgroundColor}
        />
      </Router>,
    );

    expect(screen.getByText(/Payment$/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment to credit card/i)).toBeInTheDocument();
    expect(screen.getByText('+ $76.00')).toBeInTheDocument();
    expect(screen.getByText(/sat, jun 29/i)).toBeInTheDocument();
    expect(screen.getByText(/10:25pm/i)).toBeInTheDocument();
    expect(screen.getByText(/no budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/no tags/i)).toBeInTheDocument();
    expect(screen.getByText(/transfer/i)).toBeInTheDocument();
  });

  test('Show Records Paid verbiage with transfer income record', () => {
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={mockIncomeTransfer}
          backgroundColor={backgroundColor}
        />
      </Router>,
    );
    const totalRecordsPaid = (mockIncomeTransfer?.expensesPaid ?? [])?.length;

    expect(screen.getByText(`Records Paid: ${totalRecordsPaid}`)).toBeInTheDocument();
  });
});
