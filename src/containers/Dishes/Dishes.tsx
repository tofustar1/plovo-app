import DishItem from "./DishItem.tsx";
import {addDish} from "../../store/cartSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectDeleteDishLoading, selectDishes, selectFetchDishesLoading} from "../../store/dishesSlice.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useEffect} from "react";
import {deleteDish, fetchDishes} from "../../store/dishesThunks.ts";

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectFetchDishesLoading);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id: string) => {
    if (window.confirm('Do you really want to delete this dish?')) {
      await dispatch(deleteDish(id));
      await dispatch(fetchDishes());
    }
  };

  return (
    <div>
      <h4>Dishes</h4>
      {fetchLoading ?
        <Spinner/>
        :
        dishes.map(dish => (
          <DishItem
            key={dish.id}
            dish={dish}
            addToCart={() => dispatch(addDish(dish))}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
          />
        ))}
    </div>
  );
};

export default Dishes;