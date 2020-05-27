import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
const InteractionView = (props) => {

  const location = useLocation();
  console.log(location.state);
  let formattedSubtitle;
  let userNames = location.state.notifUsers.map((user) => user.creatorName);
  if(userNames.length > 2){
    formattedSubtitle = `By ${userNames[0]} and ${userNames.length - 1} others`;
  }
  else{
    formattedSubtitle = "By " + userNames.join(" and ");
  }
  
  return (
    <div className="center-view">
     <Header 
     title={location.state.notifType === "like" ? "Liked" : "Retweeted"}
     subtitle={formattedSubtitle}
     />
    </div>
  )
}

export default InteractionView;