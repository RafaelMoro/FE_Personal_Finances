import { useRef } from 'react';

const useCurrencyField = () => {
  const initialAmount = useRef('');

  const updateAmount = (amount: string) => {
    initialAmount.current = amount;
  };

  const verifyAmountEndsPeriod = (amount: string) => {
    const endsPeriodRegex = /\.$/;
    const endsPeriod = amount.match(endsPeriodRegex);
    if (endsPeriod) {
      return amount.replace(endsPeriodRegex, '');
    }
    return amount;
  };

  return {
    verifyAmountEndsPeriod,
    initialAmount,
    updateAmount,
  };
};

export { useCurrencyField };
