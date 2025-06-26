import type {CartDish} from "../../types";
import Modal from "../Modal/Modal.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CartDishes from "./CartDishes.tsx";

interface Props {
  cartDishes: CartDish[];
}

const Cart = ({cartDishes}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onCloseModal = () => setShowModal(false);

  let cart = (
    <div className="alert alert-primary">
      Cart is empty! Add something!
    </div>
  );

  if (cartDishes.length > 0) {
    cart = (
      <>
        <CartDishes cartDishes={cartDishes} />
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
          Do you want to continue to checkout ?
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onCloseModal}>
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate('/checkout')}
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;