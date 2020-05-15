import React from "react";
import NotificationListItem from "./NotificationListItem";

const NotificationList = (props) => {

  return (
    props.notifications.map(notification => <NotificationListItem text={notification.content}/>)
  )
}

export default NotificationList;