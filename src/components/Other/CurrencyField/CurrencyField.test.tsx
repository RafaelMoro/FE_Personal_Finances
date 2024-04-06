import { render, screen } from '@testing-library/react';
import { CurrencyField } from './CurrencyField';
import { TypeOfRecord } from '../../../globalInterface';

describe('CurrencyField component', () => {
  const amount = '0';
  const typeOfRecord: TypeOfRecord = 'income';
  const setFieldValue = jest.fn();
  const updateAmount = jest.fn();
  test('Show an amount field with Amount placeholder', () => {
    render(<CurrencyField
      amount={amount}
      typeOfRecord={typeOfRecord}
      setFieldValue={setFieldValue}
      updateAmount={updateAmount}
    />);
    const input = screen.getByRole('textbox', { name: /amount/i });
    expect(input).toBeInTheDocument();
  });
});
