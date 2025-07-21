import {type FC} from 'react';
import Dishes from "../../components/Dishes/Dishes.tsx";
import Cart from "../../components/Cart/Cart.tsx";
import type {CartDish, Dish} from "../../types";
import Spinner from "../../components/Spinner/Spinner.tsx";
import axiosApi from "../../axiosApi.ts";

interface Props {
  dishes: Dish[]
  addToCart: (dish: Dish) => void
  cartDishes: CartDish[]
  dishesLoading: boolean
  fetchDishes: () => Promise<void>
}

const Home:FC<Props> = ({dishes, addToCart, cartDishes, dishesLoading, fetchDishes}) => {

  const deleteDish = async (id: string) => {
    if (window.confirm('Do you really want to delete this dish?')) {
      await axiosApi.delete(`/dishes/${id}.json`);
      await fetchDishes();
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-7">
        {dishesLoading ?
          <Spinner/>
          :
          <Dishes
            dishes={dishes}
            addToCart={addToCart}
            deleteDish={deleteDish}
          />
        }
      </div>
      <div className="col-5">
        <Cart cartDishes={cartDishes}/>
      </div>
    </div>
  );
};

export default Home;