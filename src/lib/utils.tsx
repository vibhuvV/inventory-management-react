export const getNumericValueFromCurrency = (
  value: string,
  currencySymbol = "$",
) => {
  return value.startsWith(currencySymbol)
    ? value.slice(currencySymbol.length)
    : value;
};
