import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
const Header = (props) => {
  let history = useHistory();
  const backButtonHandler = () => {
    history.goBack();
  }
  return (
    <div className={`header ${props.noBorder ? "__no-border" : ""}`}>
      {props.navButton && (
        <span className="fa-layers back-button" onClick={backButtonHandler}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="lg"
            color="#1da1f2"
            className="back-icon"
          />
          <FontAwesomeIcon
            icon={faCircle}
            size="3x"
            color="rgba(29, 161, 242, 0.1)"
            className="back-circle-icon"
            transform="left-3.0"
          />
        </span>
      )}
      <div className="header-text">
        <h2>{props.title}</h2>
        <div className="subheader">
          {props.subtitle}
        </div>
      </div>


    </div>
  )
}

export default Header;