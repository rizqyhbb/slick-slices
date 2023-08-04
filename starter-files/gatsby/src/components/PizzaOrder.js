import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import { calculatePizzaPrice } from '../utils/calculatePizzaPrice';
import { formatToCAD } from '../utils/helper';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const singlePizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={singlePizza.image.asset.fluid} />
            <h2>{singlePizza.name}</h2>
            <p>
              {formatToCAD(
                calculatePizzaPrice(singlePizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${singlePizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
