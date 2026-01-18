export const formatCurrency = (value, symbol) => {
  if (value == null) return `${symbol}0`;

  return `${symbol}${Number(value).toLocaleString()}`;
};
