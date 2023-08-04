const formatter = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export const formatToCAD = (priceOfCent) => formatter.format(priceOfCent / 100);
