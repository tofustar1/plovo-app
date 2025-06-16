import Backdrop from "../Backdrop/Backdrop.tsx";
import type {MouseEventHandler, PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
  show: boolean;
  title: string;
  onClose: MouseEventHandler;
}

const Modal = ({show, title, onClose, children}: Props) => {
  return (
    <>
      <Backdrop show={show}/>
      <div
        className="modal show"
        style={{display: show ? 'block' : 'none'}}
        onClick={onClose}
      >
        <div className="modal-dialog" onClick={event => event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;