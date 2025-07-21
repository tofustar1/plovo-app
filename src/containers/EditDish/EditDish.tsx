import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import type {ApiDish} from "../../types";
import DishForm from "../../components/DishForm/DishForm.tsx";
import Spinner from "../../components/Spinner/Spinner.tsx";

const EditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState<ApiDish | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchDish = useCallback(async() => {
    const response = await axiosApi<ApiDish>(`/dishes/${id}.json`);

    setDish(response.data);
  }, [id]);

  useEffect(() => {
    void fetchDish();
  }, [fetchDish]);

  const onUpdateDish = async (updatedDish: ApiDish) => {
    try {
      setUpdating(true);
      await axiosApi.put(`/dishes/${id}.json`, updatedDish);
      navigate('/');
    } finally {
      setUpdating(false);
    }
  };

  const existingDish = dish && {
    ...dish,
    price: dish.price.toString()
  };

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        {existingDish ?
          <DishForm
            onSubmit={onUpdateDish}
            existingDish={existingDish}
            isEdit
            isLoading={updating}
          />
          :
          <Spinner/>
        }
      </div>
    </div>
  );
};

export default EditDish;