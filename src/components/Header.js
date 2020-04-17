import React from "react";
import "./Header.css";
const Header = (props) => {
  return(
    <div className="header">
    <h2>{props.title}</h2>
    
    <div className="subheader">
      {props.subtitle}
    </div>
    
    </div>
  )
}

export default Header;