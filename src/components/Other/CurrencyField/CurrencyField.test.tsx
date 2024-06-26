import { render, screen } from '@testing-library/react';
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
  test('Show an amount field.', () => {
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

  test('Given a user typing a period as first character, should not show anything typed', () => {
    const newValue = '.';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newValue);
    expect(input).toHaveValue('');
  });

  test('Given a user typing 125 as amount, should show 125 as input value', () => {
    const newAmount = '125';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newAmount);
    expect(input).toHaveValue('125');
  });

  test('Given a user typing 1025, should show 1,025 as input value', () => {
    const newAmount = '1025';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newAmount);
    expect(input).toHaveValue('1,025');
  });

  test('Given a user typing 1025.5, should show 1,025.5 as input value', () => {
    const newAmount = '1025.5';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newAmount);
    expect(input).toHaveValue('1,025.5');
  });

  test('Given a user typing 1250, the input value should be 1,250. Then, he deletes the 0, the input value should be 125', () => {
    const firstAmount = '1250';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, firstAmount);
    expect(input).toHaveValue('1,250');

    userEvent.type(input, '{backspace}');
    expect(input).toHaveValue('125');
  });

  test('Given a user typing a number with more than 2 decimals, it should show only two decimals', () => {
    const newAmount = '1250.574';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, newAmount);
    expect(input).toHaveValue('1,250.57');
  });

  test('Given a user typing a number with 3789, then he erases all the numbers, it should be an empty field', () => {
    const firstAmount = '3789';
    const input = screen.getByRole('textbox', { name: /amount/i });

    userEvent.type(input, firstAmount);
    expect(input).toHaveValue('3,789');
    userEvent.type(input, '{backspace}');
    userEvent.type(input, '{backspace}');
    userEvent.type(input, '{backspace}');
    userEvent.type(input, '{backspace}');
    expect(input).toHaveValue('');
  });
});
