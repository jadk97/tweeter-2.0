import React from "react";
import Header from "./Header";
import { useLocation, Redirect, useHistory } from "react-router-dom";

const InteractionView = (props) => {

  const location = useLocation();
  const history = useHistory();

  
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
  }
  else {
    history.push("/home");
  }

  return (
    <div className="center-view">
      {location.state && (
        <Header
          navButton={true}
          title={location.state.notifType === "like" ? "Liked" : "Retweeted"}
          subtitle={formattedSubtitle}
        />
      )}

    </div>
  )
}

export default InteractionView;