import DishItem from "./DishItem.tsx";
import type {Dish} from "../../types";

interface Props {
  dishes: Dish[]
}

const Dishes = ({dishes}: Props) => {
  return (
    <div>
      <h4>Dishes</h4>
      {dishes.map(dish => (
        <DishItem
          key={dish.id}
          dish={dish}
        />
      ))}
    </div>
  );
};

export default Dishes;