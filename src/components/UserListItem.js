import React, { useState } from "react";
import "./UserListItem.css";
import Button from "./Button";
import { selectUserProfile, followUser, unfollowUser } from '../reducers/userProfileSlice';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserListItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  let isFollowed = userProfile.following.filter((user) => user.creatorHandle === props.creatorHandle).length > 0;
  let followsYou = !!userProfile.followers.find((user) => user.creatorHandle === props.creatorHandle);
  const [hover, setHover] = useState(false);


  const clickHandler = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let clickedElement = e.currentTarget.classList;
    console.log(clickedElement);
    if(clickedElement[0] === "creator-credentials" || clickedElement[0] === "user-container" || clickedElement[0] === "user-avatar"){
      history.push(`/${props.creatorHandle}`)
    }
    if(clickedElement[0] === "button"){
       followHandler();
    }
  }


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
    <div className="user-container" onClick={clickHandler}>

      <div className="user-details"  >
        <div className="user-avatar" onClick={clickHandler}>
          <img className="avatar" src={props.avatar} />
        </div>

        <div className="user-text">
          <div className="creator-details">
              <span className="creator-credentials">
                <span className="creator-name">{props.creatorName}</span>
                <div className="creator-handle"> @{props.creatorHandle}{followsYou && <span className="user-follows-you">Follows you</span>}</div>
              </span>
        
            <div className="user-follow-button">
              <Button onClick={clickHandler}
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