import { render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { AddIndebtedPerson } from './AddIndebtedPerson';
import { IndebtedPeople } from '../../../../../globalInterface';
import { mockIndebtedPerson } from '../../Record.mocks';

const WrapperAddIndebtedPerson = ({
  onClose, indebtedPerson, modifyAction = false, initialIndebtedPerson = [],
}
: { onClose: () => void; modifyAction?: boolean; indebtedPerson: IndebtedPeople | null; initialIndebtedPerson?: IndebtedPeople[] }) => {
  const [indebtedPeople, setIndebtedPeople] = useState<IndebtedPeople[]>(initialIndebtedPerson);
  const addIndebtedPerson = (newIndebtedPerson: IndebtedPeople) => setIndebtedPeople([...indebtedPeople, newIndebtedPerson]);
  const updateIndebtedPerson = (newIndebtedPerson: IndebtedPeople):void => {
    const personExist = indebtedPeople.find((person) => person.name === newIndebtedPerson.name);
    if (personExist && indebtedPerson) {
      const filteredData = indebtedPeople.filter((person) => person.name !== personExist.name);
      setIndebtedPeople([...filteredData, indebtedPerson]);
    }
  };

  return (
    <AddIndebtedPerson
      open
      onClose={onClose}
      indebtedPerson={indebtedPerson}
      indebtedPeople={indebtedPeople}
      addPerson={addIndebtedPerson}
      modifyAction={modifyAction}
      updatePerson={updateIndebtedPerson}
    />
  );
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<AddIndebtedPerson />', () => {
  const onClose = jest.fn();
  test('Show a heading, full name, amount, amount paid inputs, transaction paid checkbox and add person button', () => {
    render(
      <WrapperAddIndebtedPerson onClose={onClose} indebtedPerson={null} />,
    );

    expect(screen.getByRole('heading', {
      name: /add person/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('textbox', {
      name: /full name/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /amount$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /amount paid/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Transaction paid/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add person/i }),
    ).toBeInTheDocument();
  });

  test('If the user clicks on the add person button, show that inputs are required to be filled', async () => {
    render(
      <WrapperAddIndebtedPerson onClose={onClose} indebtedPerson={null} />,
    );

    const button = screen.getByRole('button', { name: /add person/i });
    userEvent.click(button);

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/amount is required/i)).toBeInTheDocument();
    expect(screen.getByText(/amount paid is required/i)).toBeInTheDocument();
  });

  test('If the user fills the information, the add indebted person modal is closed', async () => {
    render(
      <WrapperAddIndebtedPerson onClose={onClose} indebtedPerson={null} />,
    );

    const fullNameInput = screen.getByRole('textbox', {
      name: /full name/i,
    });
    const amountInput = screen.getByRole('textbox', { name: /amount$/i });
    const amountPaidInput = screen.getByRole('textbox', { name: /amount paid/i });
    const button = screen.getByRole('button', { name: /add person/i });

    userEvent.type(fullNameInput, 'John');
    userEvent.type(amountInput, '100');
    userEvent.type(amountPaidInput, '0');
    userEvent.click(button);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('If the user tries to put a name that was already exist, show error', async () => {
    const initialIndebtedPerson: IndebtedPeople[] = [{
      name: 'John', amount: '100', amountPaid: '0', isPaid: false,
    }];

    render(
      <WrapperAddIndebtedPerson onClose={onClose} indebtedPerson={null} initialIndebtedPerson={initialIndebtedPerson} />,
    );

    const fullNameInput = screen.getByRole('textbox', {
      name: /full name/i,
    });
    const button = screen.getByRole('button', { name: /add person/i });

    userEvent.type(fullNameInput, 'John');
    userEvent.click(button);

    expect(await screen.findByText(/John cannot be repeated. Try a different one./i)).toBeInTheDocument();
  });

  test('If a user wants to modify an indebted person, show Modify in title and button', () => {
    render(
      <WrapperAddIndebtedPerson onClose={onClose} indebtedPerson={mockIndebtedPerson} modifyAction />,
    );

    expect(screen.getByRole('heading', {
      name: /modify person/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('textbox', {
      name: /full name/i,
    })).toHaveValue('John');
    expect(screen.getByRole('textbox', { name: /amount$/i })).toHaveValue('100');
    expect(screen.getByRole('textbox', { name: /amount paid/i })).toHaveValue('0');
    expect(screen.getByRole('checkbox', { name: /Transaction paid/i })).not.toBeChecked();
    expect(
      screen.getByRole('button', { name: /modify person/i }),
    ).toBeInTheDocument();
  });

  test('If the user edits an indebted person, the modify indebted person modal is closed', async () => {
    render(
      <WrapperAddIndebtedPerson onClose={onClose} indebtedPerson={mockIndebtedPerson} modifyAction />,
    );

    const fullNameInput = screen.getByRole('textbox', {
      name: /full name/i,
    });
    const amountInput = screen.getByRole('textbox', { name: /amount$/i });
    const amountPaidInput = screen.getByRole('textbox', { name: /amount paid/i });
    const button = screen.getByRole('button', { name: /modify person/i });

    userEvent.type(fullNameInput, 'Beto');
    userEvent.type(amountInput, '150');
    userEvent.type(amountPaidInput, '0');
    userEvent.click(button);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
