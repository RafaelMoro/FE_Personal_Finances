import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Record } from './Record';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { mockRecords } from './Record.mocks';

describe('<Records />', () => {
  test('Render expense in Mobile', () => {
    const [expense] = mockRecords;
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={expense}
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

  test('Render income in Mobile', () => {
    const [, income] = mockRecords;
    const backgroundColor = 'green';
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Record
          record={income}
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
});
