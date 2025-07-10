import type {DishMutation, TypeApiDish} from "../../types";
import {type ChangeEvent, type FormEvent, useState} from "react";

interface Props {
  onSubmit: (dish: TypeApiDish) => void;
  editedDish?: TypeApiDish;
}

const DishForm = ({onSubmit, editedDish}: Props) => {
  const [dish, setDish] = useState<DishMutation>(editedDish ?
      {
        ...editedDish,
        price: editedDish.price.toString()
      }
      :
      {
        name: '',
        description: '',
        image: '',
        price: ''
      }
  );

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
      ...dish,
      price: Number(dish.price)
    });

  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h4>{editedDish ? 'Edit dish' : 'Add dish'}</h4>
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
      <button type="submit" className="btn btn-primary">{editedDish ? 'Edit' : 'Create'}</button>
    </form>
  );
};

export default DishForm;