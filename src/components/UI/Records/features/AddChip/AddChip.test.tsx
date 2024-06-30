import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { AddChip } from './AddChip';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Show an input with placeholder add tag and add tag button', () => {
  const mockUpdateData = jest.fn();
  render(
    <AddChip
      name="tag"
      label="Tag"
      action="Add Tag"
      chipsData={[]}
      updateData={mockUpdateData}
    />,
  );

  expect(screen.getByRole('button', { name: /add tag/i })).toBeInTheDocument();
  expect(screen.getByText(/no tags added/i)).toBeInTheDocument();
});
