export const formatPrice = (price: string): string => {
  if (price === "NA") return "-";
  return price;
};