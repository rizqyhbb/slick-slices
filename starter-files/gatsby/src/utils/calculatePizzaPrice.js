const sizeList = {
  S: 0.75,
  M: 1,
  L: 1.35,
};

export const calculatePizzaPrice = (priceInCent, size) =>
  priceInCent * sizeList[size];
