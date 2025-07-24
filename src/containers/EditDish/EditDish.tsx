import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {ApiDish} from "../../types";
import DishForm from "../../components/DishForm/DishForm.tsx";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchOneDishLoading, selectOneDish, selectUpdateLoading} from "../../store/dishesSlice.ts";
import {fetchOneDish, updateDish} from "../../store/dishesThunks.ts";

const EditDish = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const dish = useAppSelector(selectOneDish);
  const fetchOneDishLoading = useAppSelector(selectFetchOneDishLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (updatedDish: ApiDish) => {
    await dispatch(updateDish({id, dish: updatedDish}));
    navigate('/');
  };

  const existingDish = dish && {
    ...dish,
    price: dish.price.toString()
  };

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        {fetchOneDishLoading && <Spinner />}
        {existingDish &&
          <DishForm
            onSubmit={onSubmit}
            existingDish={existingDish}
            isEdit
            isLoading={updateLoading}
          />
        }
      </div>
    </div>
  );
};

export default EditDish;