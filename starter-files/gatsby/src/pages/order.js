import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import { calculatePizzaPrice } from '../utils/calculatePizzaPrice';
import { formatToCAD } from '../utils/helper';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, onChange } = useForm({
    name: '',
    email: '',
    mappleSyrup: '',
  });
  const {
    addToOrder,
    error,
    loading,
    message,
    order,
    removeFromOrder,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });
  return (
    <>
      <SEO title="Order Pizza@" />
      <OrderStyles onSubmit={submitOrder}>
        {message ? <p>{message} </p> : ''}
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={onChange}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={onChange}
            />
          </label>
          <input
            type="text"
            name="mappleSyrup"
            value={values.mappleSyrup}
            onChange={onChange}
            className="honeypot"
          />
        </fieldset>

        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatToCAD(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>

        <fieldset disabled={loading}>
          <legend className="order">Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your Total Is {formatToCAD(calculateOrderTotal(order, pizzas))}
          </h3>
          {error ? <p>Error: {error}</p> : ''}
          <button disabled={loading} type="submit">
            {loading ? 'Placing order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
