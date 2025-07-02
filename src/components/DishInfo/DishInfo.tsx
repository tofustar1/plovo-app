import {useParams} from "react-router-dom";

const DishInfo = () => {
  const params = useParams();

  console.log(params);

  return (
    <div>
      Dish info will be here {params.id}
      <button>Удалить</button>
    </div>
  );
};

export default DishInfo;