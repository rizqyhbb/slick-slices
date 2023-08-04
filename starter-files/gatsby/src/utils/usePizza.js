import { useContext, useState } from 'react';
import { OrderContext } from '../components/OrderContext';
import { formatToCAD } from './helper';
import calculateOrderTotal from './calculateOrderTotal';
import { attachNameAndPrices } from './attachNameAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // we remove useState below to replace it with context
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // Mapping all data that we need to pass in order handler (email or anuthing)
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    const body = {
      order: attachNameAndPrices(order, pizzas),
      total: formatToCAD(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mappleSyrup: values.mappleSyrup,
    };

    // 4. Send this data the a serevrless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down for your pizza!');
    }
  }

  return {
    addToOrder,
    error,
    loading,
    message,
    order,
    removeFromOrder,
    submitOrder,
  };
}
