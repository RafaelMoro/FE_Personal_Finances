import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
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

test('Add a tag and the array has changed', async () => {
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
  expect(tags.length).toBe(0);

  const input = screen.getByRole('textbox', {
    name: /tag$/i,
  });
  const button = screen.getByRole('button', { name: /add tag/i });
  userEvent.type(input, 'New tag');
  userEvent.click(button);

  await waitFor(() => {
    expect(tags.length).toBe(1);
  });
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
