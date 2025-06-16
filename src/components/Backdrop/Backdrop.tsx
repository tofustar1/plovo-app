import type {MouseEventHandler} from "react";

interface Props {
  show: boolean;
  onClick?: MouseEventHandler;
}

const Backdrop = ({show, onClick}: Props) => {
  return (
    <div
      className="modal-backdrop show"
      style={{display: show ? 'block' : 'none'}}
      onClick={onClick}
    />
  );
};

export default Backdrop;