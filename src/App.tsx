import {useCallback, useEffect, useState} from "react";
import type {CartDish, Dish, DishesList} from "./types";
import Home from "./containers/Home/Home.tsx";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import CustomerForm from "./containers/CustomerForm/CustomerForm.tsx";
import axiosApi from "./axiosApi.ts";
import EditDish from "./containers/EditDish/EditDish.tsx";
import Orders from "./containers/Orders/Orders.tsx";
import Layout from "./components/Layout/Layout.tsx";
import './App.css'

const App = () => {
  const location = useLocation();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);
  const [loading, setLoading] = useState(false);

  const updateCart = useCallback((dishes: Dish[]) => {
    setCartDishes(prev => {
      const newCartDishes: CartDish[] = [];

      prev.forEach(cartDish => {
        const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish
        });
      });

      return newCartDishes;
    });
  }, []);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosApi.get<DishesList | null>('/dishes.json');

      if(!data) {
        return;
      }

      const apiDishes = Object.keys(data).map((key) => ({...data[key], id: key }));

      setDishes(apiDishes);
      updateCart(apiDishes);
    } finally {
      setLoading(false);
    }
  }, [updateCart]);

  useEffect(() => {
    if (location.pathname === "/") {
      void fetchDishes();
    }
  }, [fetchDishes, location]);

  const addDishToCart = (dish: Dish) => {
    setCartDishes(prevState => {
      const existingIndex = prevState
        .findIndex(cartItem => cartItem.dish === dish);

      if (existingIndex !== -1) {
        const itemsCopy = [...prevState];
        const itemCopy = {...itemsCopy[existingIndex]};
        itemCopy.amount++;
        itemsCopy[existingIndex] = itemCopy;
        return itemsCopy;
      }

      return [...prevState, {dish, amount: 1}]
    });
  };

  const clearCart = () => {
    setCartDishes([]);
  };

  return (
    <Layout>
      <Routes>
        {
          ['/', '/dishes'].map(path => (
            <Route
              path={path}
              element={(
                <Home
                  cartDishes={cartDishes}
                  dishes={dishes}
                  addToCart={addDishToCart}
                  dishesLoading={loading}
                  fetchDishes={fetchDishes}
                />
              )}
            />
          ))
        }
        <Route path="/new-dish" element={(<NewDish/>)}/>
        <Route path="/dishes/edit/:id" element={<EditDish/>}/>
        <Route path="/checkout" element={<Checkout cartDishes={cartDishes}/>}>
          <Route path="continue" element={<CustomerForm cartDishes={cartDishes} clearCart={clearCart}/>}/>
        </Route>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    </Layout>
  )
};

export default App
