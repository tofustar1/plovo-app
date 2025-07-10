import {useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import type {TypeApiDish} from "../../types";
import DishForm from "../../components/DishForm/DishForm.tsx";
import Spinner from "../../components/Spinner/Spinner.tsx";

const EditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState<TypeApiDish | null>(null);

  useEffect(() => {
    const fetchDish = async() => {
      const response = await axiosApi<TypeApiDish>(`/dishes/${id}.json`);

      setDish(response.data);
    };

    void fetchDish();
  }, [id]);

  const onUpdateDish = async (updatedDish: TypeApiDish) => {
    try {
      await axiosApi.put(`/dishes/${id}.json`, updatedDish);
    } finally {
      navigate('/');
    }
  }

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        {dish ?
          <DishForm
            onSubmit={onUpdateDish}
            editedDish={dish}
          />
          :
          <Spinner/>
        }
      </div>
    </div>
  );
};

export default EditDish;