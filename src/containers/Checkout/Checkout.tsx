import CartDishes from "../../components/Cart/CartDishes.tsx";
import type {CartDish} from "../../types";
import type {FC} from "react";
import {Link, Navigate, Outlet} from "react-router-dom";

interface Props {
  cartDishes: CartDish[]
}

const Checkout: FC<Props> = ({cartDishes}) => {

  if (cartDishes.length === 0) {
    return <Navigate to="/"/>
  }

  return (
    <div className="row mt-2">
      <div className="col-8 m-auto">
        <h4>Checkout</h4>
        <CartDishes cartDishes={cartDishes}/>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-danger">Cancel</Link>
          <Link to="continue" className="btn btn-primary">Continue</Link>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Checkout;