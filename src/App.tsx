import Toolbar from "./components/Toolbar/Toolbar.tsx";
import './App.css'
import DishForm from "./components/DishForm/DishForm.tsx";
import Dishes from "./components/Dishes/Dishes.tsx";
import Cart from "./components/Cart/Cart.tsx";
import {useState} from "react";
import type {Dish} from "./types";

const App = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    {id: crypto.randomUUID(), name: 'Pilaf', description: 'Very tasty pilaf', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6M3G5ERi6tbVrB6R7IAAlmSqBt3PhlWtnVg&s', price: 300},
    {id: crypto.randomUUID(), name: 'Lagman', description: 'Amazing dish!', image: 'https://img.iamcook.ru/2018/upl/recipes/cat/u-be7fa4f2d632b7e8e0e1b4bd326cb8d2.jpg', price: 250},
  ]);

  const addDish = (dish: Dish) => {
    setDishes(prevState => [...prevState, dish]);
  };

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container-fluid">
        <div className="row mt-3">
          <div className="col-4">
            <DishForm onSubmit={addDish}/>
          </div>
          <div className="col-4">
            <Dishes dishes={dishes} />
          </div>
          <div className="col-4">
            <Cart/>
          </div>
        </div>
      </main>
    </>
  )
};

export default App
