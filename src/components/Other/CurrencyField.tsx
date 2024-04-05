import { Field } from 'formik';
import { InputForm } from '../../styles';

interface CurrencyFieldProps {
  values?: object;
  setFieldValue: (name: string, value: string) => void
}
const CURRENCY_FIELD_NAME = 'amount';

const CurrencyField = ({ setFieldValue, values }: CurrencyFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const hasNonNumeric = /[^\d.]/;
    const isPeriod = /\./;
    // const validNumber = /^[0-9]+\.[0-9]{2,2}$/;
    if (newValue.match(hasNonNumeric)) return;
    // if (!values.amount === '' && newValue.match(isPeriod)) return;

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
