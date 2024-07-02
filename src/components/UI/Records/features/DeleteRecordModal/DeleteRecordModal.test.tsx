import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { DeleteRecordModal } from './DeleteRecordModal';
import { mockExpense } from '../../Record.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

describe('<DeleteRecordModal />', () => {
  const onClose = jest.fn();
  const closeDrawer = jest.fn();
  const history = createMemoryHistory();
  test('Show delete record modal', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <DeleteRecordModal record={mockExpense} open onClose={onClose} isExpense closeDrawer={closeDrawer} />
      </Router>,
    );

    expect(screen.getByText(/Are you sure that you want to delete the record:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
