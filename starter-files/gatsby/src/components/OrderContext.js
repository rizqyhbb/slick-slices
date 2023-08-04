import React, { useState } from 'react';

export const OrderContext = React.createContext();

function OrderProvider({ children }) {
  const [order, setorder] = useState([]);

  return (
    <OrderContext.Provider value={[order, setorder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
