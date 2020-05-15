import React from "react";
import NotificationListItem from "./NotificationListItem";

const NotificationList = (props) => {

  return (
    props.notifications.map(notification => (
      <NotificationListItem 
      text={notification.content} 
      notifType={notification.notifType} 
      likedBy={notification.likedBy}
      />
    ))
  )
}

export default NotificationList;