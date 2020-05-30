import React from "react";
import "./UserListItem.css";

const UserListItem = (props) => {
  

  return (
    <div className="user-container">
      <div className="user-details">
        <div className="user-avatar">
          <img className="avatar" src={props.avatar} />
        </div>
        <div className="user-text">
          <div className="creator-details">
            <span className="creator-credentials">
              <span className="creator-name">{props.creatorName}</span>
              <div className="creator-handle"> @{props.creatorHandle}</div>
            </span>
          </div>
          <div className="user-bio">
            {props.bio}
          </div>
        </div>
      </div>
    </div>
  )

}

export default UserListItem;