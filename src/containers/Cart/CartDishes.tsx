import CartItem from "./CartItem.tsx";
import type {CartDish} from "../../types";
import type {FC} from "react";

interface Props {
  cartDishes: CartDish[]
}

const CartDishes: FC<Props> = ({cartDishes}) => {
  const total = cartDishes.reduce((acc, value) => {
    return acc + value.dish.price * value.amount;
  }, 0);

  return (
    <>
      {cartDishes.map(cartDish => (
        <CartItem
          key={cartDish.dish.id}
          cartDish={cartDish}
        />
      ))}
      <div className="card border-0 p-2">
        <div className="row">
          <div className="col text-right">
            Total:
          </div>
          <div className="col-3 text-right">
            <strong>{total}</strong> KGS
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDishes;