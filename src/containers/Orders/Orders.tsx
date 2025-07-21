import {useCallback, useEffect, useState} from "react";
import type {Order, OrdersList} from "../../types";
import axiosApi from "../../axiosApi.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchOrders = useCallback( async() => {
    try {
      setLoading(true);
      const {data: orders} = await axiosApi.get<OrdersList | null>('/orders.json');

      if (!orders) {
        return;
      }

      const newOrders = Object.keys(orders).map(id => {
        const order = orders[id];
        const totalPrice = order.dishes.reduce((sum, cartDish) => {
          return sum + cartDish.amount * cartDish.dish.price;
        }, 0);

        return {
          ...order,
          totalPrice,
          id
        }
      });

      setOrders(newOrders);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="row mt-2">
      <div className="col">
        <h4 className="mb-2">Orders</h4>
        {loading ?
          <Spinner/>
          :
        <>
          {orders.map(order => (
            <div className="card mb-2" key={order.id}>
              <div className="card-body">
                <strong>{order.customer.name}</strong>
                <span> ordered for a total price of </span>
                <strong>{order.totalPrice}</strong>
              </div>
            </div>
          ))}
        </>
        }
      </div>
    </div>
  );
};

export default Orders;