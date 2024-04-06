const useCurrencyField = () => {
  const validateCurrencyField = (value: string) => {
    let error;
    const hasMoreThanThreeDecimals = /\.\d{3}$/;
    if (value.match(hasMoreThanThreeDecimals)) {
      error = 'You cannot use more than 2 decimals.';
      return error;
    }
    return error;
  };

  return {
    validateCurrencyField,
  };
};

export { useCurrencyField };
