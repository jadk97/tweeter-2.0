import React from "react";
import Header from "./Header";
import Tweet from "./Tweet";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import UserList from "./UserList";
import _ from "lodash";
import findPath from "../helpers/findPath";
import { useSelector } from "react-redux";
import { selectUserProfile } from '../reducers/userProfileSlice';
import "./InteractionView.css";
const InteractionView = (props) => {

  const location = useLocation();
  const history = useHistory();
  const userProfile = useSelector(selectUserProfile);
  let tweetToFocus;

  const subtitleFormatter = (notifUsers) => {
    let userNames = notifUsers.map((user) => user.creatorName);
    if (userNames.length > 2) {
      return `By ${userNames[0]} and ${userNames.length - 1} others`;
    }
    else {
      return "By " + userNames.join(" and ");
    }
  }

  let formattedSubtitle;
  if (location.state) {
    formattedSubtitle = subtitleFormatter(location.state.notifUsers);

    let pathToTweet = findPath(location.state.tweetID, userProfile.tweets).split(".");
    pathToTweet.pop();
    let tweetCopy =  _.get(userProfile.tweets, pathToTweet);
    tweetToFocus = {...tweetCopy, replies: []}
   
    
  }
  else {
    history.push("/home");
  }

  return (
    <div className="center-view">
      {location.state && (
        <React.Fragment>
          <Header
            navButton={true}
            title={location.state.notifType === "like" ? "Liked" : "Retweeted"}
            subtitle={formattedSubtitle}
          />
          <div className="interaction-view">
          <Tweet id={location.state.tweetID} tweet={tweetToFocus} />
          <div className="divider"/>
          <UserList notifUsers={location.state.notifUsers} />
          </div>
        </React.Fragment>
      )}

    </div>
  )
}

export default InteractionView;