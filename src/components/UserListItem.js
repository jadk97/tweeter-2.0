import React, { useState } from "react";
import "./UserListItem.css";
import Button from "./Button";
import { selectUserProfile, followUser, unfollowUser } from '../reducers/userProfileSlice';
import { useDispatch, useSelector } from "react-redux";

const UserListItem = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  let isFollowed = userProfile.following.filter((user) => user.creatorHandle === props.creatorHandle).length > 0;
  let followsYou = !!userProfile.followers.find((user) => user.creatorHandle === props.creatorHandle);
  const [hover, setHover] = useState(false);

  const followHandler = () => {
    if (!isFollowed) {
      dispatch(followUser({ creatorHandle: props.creatorHandle }));
      // setFollow(true)
    }
    else {
      dispatch(unfollowUser({ creatorHandle: props.creatorHandle }));
    }
  }

  const toggleHover = () => {
    setHover((prev) => !prev);
  }
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
                <div className="creator-handle"> @{props.creatorHandle}{followsYou && <span className="user-follows-you">Follows you</span>}</div>
              </span>
        
            <div className="user-follow-button">
              <Button onClick={followHandler}
                danger={isFollowed && hover}

                onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                {isFollowed ? (hover ? "Unfollow" : "Following") : "Follow"}
              </Button>
            </div>
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