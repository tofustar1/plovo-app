import DishItem from "./DishItem.tsx";
import type {Dish} from "../../types";

interface Props {
  dishes: Dish[];
  addToCart: (dish: Dish) => void;
}

const Dishes = ({dishes, addToCart}: Props) => {
  return (
    <div>
      <h4>Dishes</h4>
      {dishes.map(dish => (
        <DishItem
          key={dish.id}
          dish={dish}
          addToCart={() => addToCart(dish)}
        />
      ))}
    </div>
  );
};

export default Dishes;