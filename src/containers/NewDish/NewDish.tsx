import DishForm from "../../components/DishForm/DishForm.tsx";
import type {ApiDish} from "../../types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCreateDishLoading} from "../../store/dishesSlice.ts";
import {createDish} from "../../store/dishesThunks.ts";

const NewDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateDishLoading);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(createDish(dish));
    navigate('/');
  };

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        <DishForm
          onSubmit={onSubmit}
          isLoading={createLoading}
        />
      </div>
    </div>
  );
};

export default NewDish;