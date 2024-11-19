export const formatCADPrice = (price: number | string | null): string => {
  if (price === null || price === 'NA' || isNaN(Number(price))) {
    return 'N/A';
  }
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(numPrice);
};

export const formatCADPriceNoDecimals = (price: number | string | null): string => {
  if (price === null || price === 'NA' || isNaN(Number(price))) {
    return 'N/A';
  }
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
};
