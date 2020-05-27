import React from "react";
// import NotificationList from "./NotificationList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./NotificationListItem.css";
import { useHistory } from "react-router-dom";

const NotificationListItem = (props) => {
  let history = useHistory();
  // console.log(props.notifUsers);
  // let users = [];
  // for (let likers of props.notifUsers) {
  //   // console.log(userList.filter((user) => user.creatorHandle === likers)[0]);
  //   users.push(likers);
  // }

  const notificationTextFormatter = (notifUsers, notifType) => {
    let notifChain;
    const messageEnder = {
      like: " liked your tweet.",
      retweet: " retweeted your tweet.",
      reply: " replied to your tweet.",
    }
    if (notifUsers.length > 1) {
      notifChain = notifUsers.map((notif, i) => {
        if (i === notifUsers.length - 1) {
          // console.log("last index", mention);
          return <span>and <span className="notification-link" onClick={(event) => clickHandler(event, notif)}>{notif.creatorName}</span>{messageEnder[notifType]}</span>
        }
        else {
          return <span><span className="notification-link" onClick={(event) => clickHandler(event, notif)}>{notif.creatorName}</span>, </span>
        }
      })
    }
    else {
      notifChain = <span><span className="notification-link" onClick={(event) => clickHandler(event, notifUsers[0])}>{notifUsers[0].creatorName}</span>{messageEnder[notifType]}</span>
    }


    return notifChain;
  }

  const clickHandler = (e, user) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    let clickedElement = e.currentTarget.classList;
    console.log(clickedElement);

    if (clickedElement[0] === "notification-avatar" || clickedElement[0] === "notification-link" ){
      // history.push
      history.push(`/${user.creatorHandle}`);
    }
    // if (clickedElement[0] === "notification-link") {
    //   let creatorLink = e.currentTarget.innerText;
    //   history.push(`/${creatorLink}`);
    // }
    if (clickedElement[0] === "notification-container") {
      // history.push(`/${props.creatorHandle}/status/${props.tweetID}`);
      history.push("/interaction", {notifType: props.notifType, notifUsers: props.notifUsers})
    }
  }

  // let users = [];
  // for (let likers of props.notifUsers) {
  //   // console.log(userList.filter((user) => user.creatorHandle === likers)[0]);
  //   users.push(userList.filter((user) => user.creatorHandle === likers)[0]);
  // }


  return (
    <div className="notification-container" onClick={clickHandler}>
      <div className="notification-content">
        {props.notifType === "like" &&
          (
            <div className="notification-type">
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                color="#e0245e"
                className="notification-icon"
              />

              {props.notifUsers.map((user) => <img className="notification-avatar" src={user.avatar} onClick={(event) => clickHandler(event, user)} />)}
            </div>
          )
        }
        <div>
          {props.notifType === "retweet" &&
            (
              <div className="notification-type">
                <FontAwesomeIcon
                  icon={faRetweet}
                  size="2x"
                  color="#17bf63"
                  className="notification-icon"
                />
                {props.notifUsers.map((user) => <img className="notification-avatar" src={user.avatar} onClick={(event) => clickHandler(event, user)} />)}
              </div>
            )
          }
        </div>
        <div className="notification-text">
          <p>{notificationTextFormatter(props.notifUsers, props.notifType)}</p>
          <p className="notification-tweet-text">{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationListItem;