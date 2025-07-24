import {type ChangeEvent, type FormEvent, useState} from 'react';
import type {Customer, ApiOrder} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useDispatch} from "react-redux";
import {clearCart, selectCartDishes} from "../../store/cartSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";

const CustomerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartDishes = useAppSelector(selectCartDishes);

  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCustomer(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const order: ApiOrder = {
      customer,
      dishes: cartDishes
    };

    try {
      await axiosApi.post('/orders.json', order);
      dispatch(clearCart());
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={customer.name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          value={customer.address}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phone">Phone</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          className="form-control"
          value={customer.phone}
          onChange={onInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Place Order
      </button>
    </form>
  );

  if (loading) {
    form = <Spinner/>
  }

  return (
    <div className="row mt-5">
      <div className="col-8 m-auto">
        {form}
      </div>
    </div>
  );
};

export default CustomerForm;