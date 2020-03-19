import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
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
    </CSSTransition>
    </React.Fragment>
  )
}