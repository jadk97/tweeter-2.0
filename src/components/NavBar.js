import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <span className="logo">Tweeter</span>
        <li>
          <NavLink to="/home" activeClassName="__selected">Home</NavLink>
        </li>
        <li>
          <NavLink to="/explore" activeClassName="__selected">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/notifications" activeClassName="__selected">Notifications</NavLink>
        </li>
        <li>
          <NavLink to="messages" activeClassName="__selected">Messages</NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" activeClassName="__selected">Bookmarks</NavLink>
        </li>
        <li>
          <NavLink to="/:userHandle" activeClassName="__selected">Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default NavBar;