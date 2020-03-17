import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
const Profile = (props) => {
  let { creatorHandle } = useParams();
  return (
    <div className="center-view">
      <Header title={creatorHandle} />
    </div>
  )
}

export default Profile;