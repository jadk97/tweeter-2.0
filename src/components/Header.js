import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
const Header = (props) => {
  return (
    <div className="header">
      <span className="fa-layers back-button">
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
      <div className="header-text __with-navigation">
        <h2>{props.title}</h2>
        <div className="subheader">
          {props.subtitle}
        </div>
      </div>


    </div>
  )
}

export default Header;