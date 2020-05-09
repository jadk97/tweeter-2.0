import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHashtag, faBell, faEnvelope, faBookmark, faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Modal from "./Modal";
import "./NavBar.css";
import ComposeTweet from "./ComposeTweet";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/userProfileSlice";
import findKeys from "../helpers/findKeys";
const NavBar = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const handleModalSubmit = () => {
    setShowModal(false);
  }

  const userProfile = useSelector(selectUserProfile);
  let likedNotifications;

  useEffect(() => {
    likedNotifications = findKeys(userProfile.tweets, "likedBy");
    console.log("useEffect ran");
    setNotificationsCount(likedNotifications.length);
    console.log(notificationsCount);
  }, []);
  const handleNotificationsClick = () => {
    console.log("handleNoticationsClick");
    setNotificationsCount(0);
  }

  return (
    <nav>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        header={
          <span className="fa-layers close-button" onClick={() => setShowModal(setShowModal((prev) => !prev))} >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              color="#1da1f2"
              className="close-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="2x"
              color="rgba(29, 161, 242, 0.1)"
              className="close-circle-icon"
            />
          </span>}
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
          <NavLink to="/notifications" activeClassName="__selected" onClick={handleNotificationsClick}  >
            <FontAwesomeIcon icon={faBell} size={"lg"} listItem />
            <span>Notifications</span>
              {notificationsCount > 0 && 
                <div className="badge">{notificationsCount}</div>
              }
            
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