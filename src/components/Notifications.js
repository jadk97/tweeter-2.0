import React from "react";
import Header from "./Header";
import flattenTweets from "../helpers/flattenTweets";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/userProfileSlice";
const Notifications = (props) => {

  const userProfile = useSelector(selectUserProfile);

  const getInteractions = (userProfile.tweets || []).map((tweet) => {
    if (tweet.likedBy.length > 0 || tweet.retweetedBy.length > 0) {
      return tweet;
    }

  });


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
  }
  console.log(notificationsFeed);
  return (
    <div className="center-view">
      <Header title={"Notifications"} />
    </div>
  )
}

export default Notifications;