import React from "react";
import Header from "./Header";
import flattenTweets from "../helpers/flattenTweets";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/userProfileSlice";
import { useRouteMatch, useLocation } from "react-router-dom";
import _ from "lodash";
import HorizontalNavBar from "./HorizontalNavBar";
import NotificationList from "./NotificationList";
import fetchInteractions from "../helpers/fetchInteractions";
const Notifications = (props) => {

  const userProfile = useSelector(selectUserProfile);
  let match = useRouteMatch();
  let location = useLocation();
  let viewMode = location.pathname.split("/");

  let notificationsFeed = fetchInteractions(userProfile);
  console.log("notifications", notificationsFeed)  
  if (viewMode[viewMode.length - 1] === "mentions") {
    notificationsFeed = notificationsFeed.filter((notif) => notif.notifType === "reply");
  }
  console.log(notificationsFeed);
  return (
    <div className="center-view">
      <Header title={"Notifications"} noBorder={true} />
      <HorizontalNavBar headings={[{ title: "All", path: `${match.url}` }, { title: "Mentions", path: `${match.url}/mentions` }]} />
      <NotificationList notifications={notificationsFeed} />
    </div>
  )
}

export default Notifications;