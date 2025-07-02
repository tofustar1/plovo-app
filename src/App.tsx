import Toolbar from "./components/Toolbar/Toolbar.tsx";
import './App.css'
import {useState} from "react";
import type {CartDish, Dish} from "./types";
import Home from "./containers/Home/Home.tsx";
import NewDish from "./containers/NewDish/NewDish.tsx";
import {Route, Routes} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout.tsx";
import Order from "./containers/Order/Order.tsx";
import DishInfo from "./components/DishInfo/DishInfo.tsx";

const App = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    {id: crypto.randomUUID(), name: 'Pilaf', description: 'Very tasty pilaf', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6M3G5ERi6tbVrB6R7IAAlmSqBt3PhlWtnVg&s', price: 300},
    {id: crypto.randomUUID(), name: 'Lagman', description: 'Amazing dish!', image: 'https://img.iamcook.ru/2018/upl/recipes/cat/u-be7fa4f2d632b7e8e0e1b4bd326cb8d2.jpg', price: 250},
  ]);

  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);

  const addDish = (dish: Dish) => {
    setDishes(prevState => [...prevState, dish]);
  };

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
          <Route path="/new-dish" element={(
            <NewDish onCreate={addDish}/>
          )}
          />
          <Route path="/checkout" element={<Checkout cartDishes={cartDishes}/>}>
            <Route path="continue" element={<Order cartDishes={cartDishes}/>}/>
          </Route>
          <Route path="/dishes/:id" element={<DishInfo/>}/>
          <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes>
      </main>
    </>
  )
};

export default App
