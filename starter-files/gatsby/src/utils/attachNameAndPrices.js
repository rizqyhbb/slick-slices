import { calculatePizzaPrice } from './calculatePizzaPrice';
import { formatToCAD } from './helper';

export const attachNameAndPrices = (order, pizzas) =>
  order.map((item) => {
    const singlePizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item,
      name: singlePizza.name,
      price: formatToCAD(calculatePizzaPrice(singlePizza.price, item.size)),
      thumbnail: singlePizza.image.asset.fluid.src,
    };
  });
