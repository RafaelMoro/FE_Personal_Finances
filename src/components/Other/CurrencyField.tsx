import { Field } from 'formik';
import { InputForm } from '../../styles';

interface CurrencyFieldProps {
  amount: string;
  setFieldValue: (name: string, value: string) => void
}
const CURRENCY_FIELD_NAME = 'amount';

const CurrencyField = ({ setFieldValue, amount }: CurrencyFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const hasNonNumeric = /[^\d.]/;
    const isPeriod = /\./;
    // const validNumber = /^[0-9]+\.[0-9]{2,2}$/;
    // If the value is not a number, do not update the field
    if (newValue.match(hasNonNumeric)) return;
    // If the new character is a period and there is no number, do not update the field
    if (amount === '' && newValue.match(isPeriod)) return;

    setFieldValue(CURRENCY_FIELD_NAME, newValue);
  };

  return (
    <Field
      component={InputForm}
      name="amount"
      type="text"
      variant="standard"
      label="Amount"
      onChange={handleChange}
    />
  );
};

export { CurrencyField };
