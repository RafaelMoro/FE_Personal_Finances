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

test('Show an error if the input is empty and the button is clicked', async () => {
  const tags: string[] = [];
  const mockUpdateData = jest.fn((newTags) => tags.push(newTags));
  render(
    <AddChip
      name="tag"
      label="Tag"
      action="Add Tag"
      chipsData={tags}
      updateData={mockUpdateData}
    />,
  );
  const button = screen.getByRole('button', { name: /add tag/i });
  userEvent.click(button);

  expect(await screen.findByText(/Tag cannot be added empty/i)).toBeInTheDocument();
});
