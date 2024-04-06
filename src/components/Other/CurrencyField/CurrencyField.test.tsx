import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';
import { useState } from 'react';
import { CreateRecordSchema } from '../../../validationsSchemas/records.schema';
import { CurrencyField } from './CurrencyField';
import { TypeOfRecord } from '../../../globalInterface';

const ScaffoldedCurrencyField = () => {
  const initialValues = { amount: '' };
  const typeOfRecord: TypeOfRecord = 'income';
  const handleSubmit = jest.fn();
  // amount needs to be an empty string
  const [amount, setAmount] = useState('');
  const updateAmount = jest.fn((newAmount: string) => { setAmount(newAmount); });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CreateRecordSchema}
      enableReinitialize
      validateOnMount
    >
      {({ setFieldValue }) => (
        <CurrencyField
          amount={amount}
          typeOfRecord={typeOfRecord}
          setFieldValue={setFieldValue}
          updateAmount={updateAmount}
        />
      )}
    </Formik>
  );
};

describe('CurrencyField component', () => {
  beforeEach(() => {
    render(<ScaffoldedCurrencyField />);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  test('Show an amount field with Amount placeholder', () => {
    const input = screen.getByRole('textbox', { name: /amount/i });
    expect(input).toBeInTheDocument();
  });

  test('Given a user typing any words, should not show anything typed', () => {
    const newValue = 'abc';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newValue);
    expect(input).toHaveValue('');
  });

  test('Given a user typing a special characters, should not show anything typed', () => {
    const newValue = '!*@';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newValue);
    expect(input).toHaveValue('');
  });

  test('Given a user typing a period, should not show anything typed', () => {
    const newValue = '.';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newValue);
    expect(input).toHaveValue('');
  });

  test('Given a user typing 125 as amount, should not show 125 as input value', async () => {
    const newAmount = '125';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newAmount);
    await waitFor(() => expect(input).toHaveValue('125'));
  });
});
