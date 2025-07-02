import type {Dish} from "../../types";
import type {MouseEventHandler} from "react";
import {Link} from "react-router-dom";

interface Props {
  dish: Dish;
  addToCart: MouseEventHandler;
}

const DishItem = ({dish, addToCart}: Props) => {
  const placeholder = 'https://cdn-icons-png.flaticon.com/512/857/857681.png';
  const image = dish.image || placeholder;

  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`
  };

  return (
    <div className="card mb-2" onClick={addToCart}>
      <div className="row g-x-0">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{dish.name}</h5>
            <p className="card-text small">{dish.description}</p>
            <p className="card-text">{dish.price} KGS</p>
            <Link to={'/dishes/' + dish.id}>Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishItem;