import Toolbar from "./components/Toolbar/Toolbar.tsx";
import './App.css'
import {useCallback, useEffect, useState} from "react";
import type {CartDish, Dish, ListDishes} from "./types";
import Home from "./containers/Home/Home.tsx";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import Order from "./containers/Order/Order.tsx";
import axiosApi from "./axiosApi.ts";
import EditDish from "./containers/EditDish/EditDish.tsx";

const App = () => {
  const location = useLocation();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);

  const fetchDishes = useCallback(async () => {
    const { data } = await axiosApi.get<ListDishes>('/dishes.json');
    const apiDishes = Object.keys(data).map((key) => {
      const dish = data[key];
      dish.id = key;
      return dish;
    });

    setDishes(apiDishes);
  }, []);

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

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container">
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
                  />
                )}
              />
            ))
          }
          <Route path="/new-dish" element={(<NewDish/>)}/>
          <Route path="/dishes/edit/:id" element={<EditDish/>}/>
          <Route path="/checkout" element={<Checkout cartDishes={cartDishes}/>}>
            <Route path="continue" element={<Order cartDishes={cartDishes}/>}/>
          </Route>
          <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes>
      </main>
    </>
  )
};

export default App
