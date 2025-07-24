import CartDishes from "../Cart/CartDishes.tsx";
import {Link, Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hooks.ts";
import {selectCartDishes} from "../../store/cartSlice.ts";

const Checkout = () => {
  const cartDishes = useAppSelector(selectCartDishes);

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