import React from "react";
import "./UserListItem.css";
import { selectUserProfile, followUser, unfollowUser } from '../reducers/userProfileSlice';
import { useDispatch, useSelector } from "react-redux";

const UserListItem = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  let isFollowed = userProfile.following.filter((user) => user.creatorHandle === props.creatorHandle).length > 0;
  let followsYou = !!userProfile.followers.find((user) => user.creatorHandle === props.creatorHandle);
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
              <div className="creator-handle"> @{props.creatorHandle} {followsYou && <span className="profile-follows-you">Follows you</span>}</div>
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