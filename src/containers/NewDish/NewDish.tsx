import DishForm from "../../components/DishForm/DishForm.tsx";
import type {Dish} from "../../types";
import type {FC} from "react";

interface Props {
  onCreate: (dish: Dish) => void;
}

const NewDish: FC<Props> = ({onCreate}) => {
  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        <DishForm onSubmit={onCreate}/>
      </div>
    </div>
  );
};

export default NewDish;