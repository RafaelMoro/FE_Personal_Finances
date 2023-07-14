/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';
import { NumericFormatProps, NumericFormat } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// eslint-disable-next-line react/display-name
const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        decimalScale={2}
        fixedDecimalScale
      />
    );
  },
);

export default NumericFormatCustom;
