import React from "react";
import Header from "./Header";
import flattenTweets from "../helpers/flattenTweets";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/userProfileSlice";
import { useRouteMatch, useLocation } from "react-router-dom";
import _ from "lodash";
import HorizontalNavBar from "./HorizontalNavBar";
import NotificationList from "./NotificationList";
const Notifications = (props) => {

  const userProfile = useSelector(selectUserProfile);
  let match = useRouteMatch();
  let location = useLocation();
  let viewMode = location.pathname.split("/");

  let retweetCheck = userProfile.tweets.filter((tweet) => tweet.retweetedBy.indexOf(userProfile.creatorHandle) > - 1 && tweet.replyCount > 0);
  console.log("retweetCheck", retweetCheck);
  let getInteractions = [...userProfile.tweets];

  if(retweetCheck.length > 0){
    for (let retweet of retweetCheck){
      let tweetIndex = getInteractions.findIndex((tweet) => retweet.id === tweet.id);
      getInteractions[tweetIndex] = {...getInteractions[tweetIndex], replies: []};
    }
  }

  let flattenedInteractions = [...flattenTweets(getInteractions)];
  console.log("FLATTENED INTERACTIONS", flattenedInteractions);
  let notificationsFeed = [];

  for (let interaction of flattenedInteractions) {
    if(interaction.creatorHandle === userProfile.creatorHandle){
      if (interaction.likedBy.length > 0 && interaction.retweetedBy.length > 0) {
        notificationsFeed.push({ notifType: "like", ...interaction });
        notificationsFeed.push({ notifType: "retweet", ...interaction });
      }
      else if (interaction.likedBy.length > 0) {
        notificationsFeed.push({ notifType: "like", ...interaction });
      }
      else if (interaction.retweetedBy.length > 0) {
        notificationsFeed.push({ notifType: "retweet", ...interaction });
      }
    }
    else if (userProfile.retweetedTweets.some((tweet) => interaction.id === tweet.id)){
      console.log("this is a retweet the user made", interaction);

    }
    else {
      notificationsFeed.push({ notifType: "reply", ...interaction })
    }
  }

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