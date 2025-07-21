import DishForm from "../../components/DishForm/DishForm.tsx";
import axiosApi from "../../axiosApi.ts";
import type {ApiDish} from "../../types";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const NewDish = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const createDish = async (dish: ApiDish) => {
    try {
      setCreating(true);
      await axiosApi.post('/dishes.json', dish);
      navigate('/');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        <DishForm
          onSubmit={createDish}
          isLoading={creating}
        />
      </div>
    </div>
  );
};

export default NewDish;