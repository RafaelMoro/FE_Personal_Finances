import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { MonthRecords } from './MonthRecords';
import { mockExpense, mockIncome } from '../../Record.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

describe('<MonthRecords />', () => {
  const history = createMemoryHistory();
  test('Show month records', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <MonthRecords
          color="white"
          openedAccordeon
          titleMonthAccordeon="January"
          totalExpense="$100.00"
          totalIncome="$200.00"
          onClickCb={jest.fn()}
          accountId="1"
          records={[mockIncome, mockExpense]}
          isGuestUser={false}
          loading={false}
          error={false}
          onEmptyCb={() => <div>No records found</div>}
          onErrorCb={() => <div>Error</div>}
          onLoadingCb={() => <div>Loading...</div>}
        />
      </Router>,
    );

    expect(screen.getByText(/January/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Expense:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Income:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200\.00/i)).toBeInTheDocument();

    // records
    expect(screen.getByText(/Solesta gym a casa/i)).toBeInTheDocument();
    expect(screen.getByText(/Casa a solesta gym/i)).toBeInTheDocument();
  });
});
