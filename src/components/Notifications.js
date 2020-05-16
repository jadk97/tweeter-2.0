import React from "react";
import Header from "./Header";
import flattenTweets from "../helpers/flattenTweets";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/userProfileSlice";
import { useRouteMatch, useLocation } from "react-router-dom";

import HorizontalNavBar from "./HorizontalNavBar";
import NotificationList from "./NotificationList";
const Notifications = (props) => {

  const userProfile = useSelector(selectUserProfile);
  let match = useRouteMatch();
  let location = useLocation();

  // const getInteractions = (userProfile.tweets || []).map((tweet) => {
  //   if (tweet.likedBy.length > 0 || tweet.retweetedBy.length > 0 || (tweet.type === "child" && tweet.creatorHandle !== userProfile.creatorHandle)) {
  //     return tweet;
  //   }

  // });

  const getInteractions = [...userProfile.tweets];


  let flattenedInteractions = [...flattenTweets(getInteractions)];
  let notificationsFeed = [];
  
  for(let interaction of flattenedInteractions){
    if(interaction.likedBy.length > 0 && interaction.retweetedBy.length > 0){
      notificationsFeed.push({notifType: "like", ...interaction});
      notificationsFeed.push({notifType: "retweet", ...interaction});
    }
    else if(interaction.likedBy.length > 0){
      notificationsFeed.push({notifType: "like", ...interaction});
    }
    else if(interaction.retweetedBy.length > 0){
      notificationsFeed.push({notifType: "retweet", ...interaction});
    }
    else{
      notificationsFeed.push({notifType: "reply", ...interaction})
    }
  }
  console.log(notificationsFeed);
  return (
    <div className="center-view">
      <Header title={"Notifications"} noBorder={true}/>
      <HorizontalNavBar headings={[{ title: "All", path: `${match.url}` }, {title: "Mentions", path: `${match.url}/mentions`}]} />
      <NotificationList notifications={notificationsFeed} />
    </div>
  )
}

export default Notifications;