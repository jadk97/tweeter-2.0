import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHashtag, faBell, faEnvelope, faBookmark, faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import "./NavBar.css";
import { useTweetInteract } from "../hooks/tweet-interact-hook";
const NavBar = (props) => {
  return (
    <nav>
      <ul className="fa-ul">
        <span className="logo">Tweeter</span>
        <li>
          <NavLink to="/home" activeClassName="__selected" >
            <FontAwesomeIcon icon={faHome} size={"lg"} listItem />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" activeClassName="__selected" >
            <FontAwesomeIcon icon={faHashtag} size={"lg"} listItem />
            <span>Explore</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" activeClassName="__selected"  >
            <FontAwesomeIcon icon={faBell} size={"lg"} listItem />
            <span>Notifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="messages" activeClassName="__selected">
            <FontAwesomeIcon icon={faEnvelope} size={"lg"} listItem />
            <span>Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" activeClassName="__selected">
            <FontAwesomeIcon icon={faBookmark} size={"lg"} listItem />
            <span>Bookmarks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${props.creatorHandle}`} activeClassName="__selected">
            <img src={props.avatar} className="fa-li navbar-avatar" />
            <span>Profile</span>
          </NavLink>
        </li>
        <li className="fa-li">
          <Button fullwidth={"fullwidth" ? 1 : 0}>Tweet</Button>
        </li>
      </ul>
    </nav>
  )
};

export default NavBar;