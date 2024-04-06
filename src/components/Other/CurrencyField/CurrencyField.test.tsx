import { render, screen } from '@testing-library/react';
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
  test('Show an amount field with Amount placeholder', () => {
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
    const input = screen.getByRole('textbox', { name: /amount/i });
    expect(input).toBeInTheDocument();
  });
});
