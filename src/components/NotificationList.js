import React from "react";
import NotificationListItem from "./NotificationListItem";
import Tweet from "./Tweet";
const NotificationList = (props) => {

  return (
    props.notifications.map(notification => {
      if (notification.notifType === "like") {
        return (
          <NotificationListItem
            text={notification.content}
            notifType={notification.notifType}
            notifUsers={notification.likedBy}
          />
        )
      }
      else if (notification.notifType === "retweet"){
        return (
          <NotificationListItem
          text={notification.content}
          notifType={notification.notifType}
          notifUsers={notification.retweetedBy}
        />
        )
      }
      else if (notification.notifType === "reply"){
        return (
          <Tweet
          key={notification.id}
          tweet={notification}
          showMentions={true}
        />
        )
      }
    }
    )
  )
}


export default NotificationList;