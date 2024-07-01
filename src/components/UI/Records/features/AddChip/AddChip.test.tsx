import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { useState } from 'react';
import { AddChip } from './AddChip';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

/*
* Missing tests:
* - Test add one more element when the elements are already 7, when 8, show error
* - Test that cannot add the same element twice
* - Test delete chip
*/

const WrapperAddChip = ({ initialTags }: { initialTags: string[] }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const updateTags = (newTags: string[]) => setTags(newTags);

  return (
    <AddChip
      name="tag"
      label="Tag"
      action="Add Tag"
      chipsData={tags}
      updateData={updateTags}
    />
  );
};

describe('<AddChip />', () => {
  test('Show an input with placeholder add tag and add tag button', () => {
    const initialTags: string[] = [];
    render(
      <WrapperAddChip initialTags={initialTags} />,
    );

    expect(screen.getByRole('button', { name: /add tag/i })).toBeInTheDocument();
    expect(screen.getByText(/no tags added/i)).toBeInTheDocument();
  });

  test('Show an error if the input is empty and the button is clicked', async () => {
    const initialTags = ['one'];
    render(
      <WrapperAddChip initialTags={initialTags} />,
    );
    const button = screen.getByRole('button', { name: /add tag/i });
    userEvent.click(button);

    expect(await screen.findByText(/Tag cannot be added empty/i)).toBeInTheDocument();
  });

  test('Add an element using the input, click the button and the element has been added', async () => {
    const initialTags = ['one'];
    render(
      <WrapperAddChip initialTags={initialTags} />,
    );

    const input = screen.getByRole('textbox', {
      name: /tag$/i,
    });
    const button = screen.getByRole('button', { name: /add tag/i });

    userEvent.type(input, 'New tag');
    expect(input).toHaveValue('New tag');

    userEvent.click(button);

    expect(await screen.findByText(/new tag/i)).toBeInTheDocument();
    expect(await screen.findByText(/one/i)).toBeInTheDocument();
  });

  test('If there are 7 elements, and the user tries to add one more, show error', async () => {
    const initialTags = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    render(
      <WrapperAddChip initialTags={initialTags} />,
    );

    const input = screen.getByRole('textbox', {
      name: /tag$/i,
    });
    const button = screen.getByRole('button', { name: /add tag/i });

    userEvent.type(input, 'New tag');
    expect(input).toHaveValue('New tag');

    userEvent.click(button);

    expect(await screen.findByText(/You cannot add more than 8 tags/i)).toBeInTheDocument();
  });

  test('If there exist the element one, and the user tries to add it again, show error', async () => {
    const initialTags = ['one'];
    render(
      <WrapperAddChip initialTags={initialTags} />,
    );

    const input = screen.getByRole('textbox', {
      name: /tag$/i,
    });
    const button = screen.getByRole('button', { name: /add tag/i });

    userEvent.type(input, 'one');
    expect(input).toHaveValue('one');

    userEvent.click(button);

    expect(await screen.findByText(/one cannot be repeated. Try a different one\./i)).toBeInTheDocument();
  });
});
