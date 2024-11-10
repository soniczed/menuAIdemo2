export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const generateMonthlyData = () => {
  const traditionalMonthly = 32640 / 12;
  const aiMonthly = 399 / 12;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return months.map((month, index) => ({
    month,
    traditional: traditionalMonthly * (index + 1),
    ai: aiMonthly * (index + 1),
  }));
};

export const calculateSavings = (traditional: number, ai: number) => {
  const savings = traditional - ai;
  const percentage = ((savings / traditional) * 100).toFixed(2);
  return { savings, percentage };
};