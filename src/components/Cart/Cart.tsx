import CartItem from "./CartItem.tsx";
import type {CartDish} from "../../types";
import Modal from "../Modal/Modal.tsx";
import {useState} from "react";

interface Props {
  cartDishes: CartDish[];
}

const Cart = ({cartDishes}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const total = cartDishes.reduce((acc, value) => {
    return acc + value.dish.price * value.amount;
  }, 0);

  const onCloseModal = () => setShowModal(false);

  let cart = (
    <div className="alert alert-primary">
      Cart is empty! Add something!
    </div>
  );

  if (cartDishes.length > 0) {
    cart = (
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
        <button
          className="btn btn-primary w-100"
          onClick={() => setShowModal(true)}
        >Order</button>
      </>
    )
  }

  return (
    <>
      <h4>Cart</h4>
      {cart}
      <Modal
        show={showModal}
        title="Order"
        onClose={onCloseModal}
      >
        <div className="modal-body">
          Content
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;