import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import "./ImageModal.css";

const ModalOverLay = (props) => {
  const content = (
    <div className={`image-modal`} style={props.style}>
    <div className={`image-modal__header`}>
    {props.header}
    </div>
      <img src={props.image}/>

      <footer className={`image-modal__footer`}>
        {props.footer}
      </footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ImageModal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverLay {...props} />
      </CSSTransition>
    </React.Fragment>
  )
}


export default ImageModal;