import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';
import { CreateRecordSchema } from '../../../validationsSchemas/records.schema';
import { CurrencyField } from './CurrencyField';
import { TypeOfRecord } from '../../../globalInterface';

describe('CurrencyField component', () => {
  const amount = '0';
  const initialValues = { amount: '' };
  const typeOfRecord: TypeOfRecord = 'income';
  const setFieldValue = jest.fn();
  const updateAmount = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={CreateRecordSchema}
        enableReinitialize
        validateOnMount
      >
        <CurrencyField
          amount={amount}
          typeOfRecord={typeOfRecord}
          setFieldValue={setFieldValue}
          updateAmount={updateAmount}
        />
      </Formik>,
    );
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
});
