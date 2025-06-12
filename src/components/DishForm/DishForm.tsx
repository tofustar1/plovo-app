import type {Dish, DishMutation} from "../../types";
import {type ChangeEvent, type FormEvent, useState} from "react";

interface Props {
  onSubmit: (dish: Dish) => void;
}

const initialDish: DishMutation = {
  name: '',
  description: '',
  image: '',
  price: ''
}

const DishForm = ({onSubmit}: Props) => {
  const [dish, setDish] = useState<DishMutation>(initialDish);

  const changeDish = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setDish(prevState => ({
        ...prevState,
        [name]: value
      }
    ));
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      id: crypto.randomUUID(),
      ...dish,
      price: parseFloat(dish.price)
    });

    setDish(initialDish);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h4>Add dish</h4>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={dish.name}
          onChange={changeDish}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          value={dish.description}
          onChange={changeDish}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Image</label>
        <input
          type="url"
          name="image"
          id="image"
          className="form-control"
          value={dish.image}
          onChange={changeDish}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control"
          value={dish.price}
          onChange={changeDish}
        />
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  );
};

export default DishForm;