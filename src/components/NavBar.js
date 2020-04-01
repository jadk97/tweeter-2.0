import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHashtag, faBell, faEnvelope, faBookmark, faCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Modal from "./Modal";
import "./NavBar.css";
import ComposeTweet from "./ComposeTweet";

const NavBar = (props) => {

  const [showModal, setShowModal] = useState(false);

  const handleModalSubmit = () => {
    setShowModal(false);
  }

  return (
    <nav>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        header={"tweet"}
        className={"navbar"}
        contentClass="tweet__modal-content-navbar"
        footerClass="tweet__modal-footer-navbar"
        footer={<ComposeTweet modalSubmit={handleModalSubmit} />}
      >
      </Modal>
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
          <Button fullwidth={"fullwidth" ? 1 : 0} onClick={() => setShowModal(true)}>Tweet</Button>
        </li>
      </ul>
    </nav>
  )
};

export default NavBar;