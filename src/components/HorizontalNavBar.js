import React from "react";
import { NavLink } from "react-router-dom";
import "./HorizontalNavBar.css";
const HorizontalNavBar = (props) => {


  return (
    <div className="horizontal-navbar">
      {props.headings.map((heading) => (
      
          <NavLink exact to={heading.path} activeClassName="__selected">
            {heading.title}
          </NavLink>
    
      ))}
    </div>
  )
};

export default HorizontalNavBar;