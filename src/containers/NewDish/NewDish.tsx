import DishForm from "../../components/DishForm/DishForm.tsx";
import axiosApi from "../../axiosApi.ts";
import type {TypeApiDish} from "../../types";
import {useNavigate} from "react-router-dom";

const NewDish = () => {
  const navigate = useNavigate();

  const onCreateDish = async (dish: TypeApiDish) => {
    try {
      await axiosApi.post('/dishes.json', dish);
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        <DishForm onSubmit={onCreateDish}/>
      </div>
    </div>
  );
};

export default NewDish;