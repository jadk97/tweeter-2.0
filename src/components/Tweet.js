import React, { useState } from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Button from "./Button";
import ComposeTweet from "./ComposeTweet";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, addLikedTweet, removeLikedTweet } from '../reducers/userProfileSlice';
import { likeTweet, unlikeTweet } from "../reducers/timelineSlice";
import { selectTimeline } from "../reducers/timelineSlice";

const Tweet = ({ tweet }) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [retweetClicked, setRetweetClicked] = useState(false);
  const [replyClicked, setReplyClicked] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  // console.log(tweet.replies);
  // let hasReplies = tweet.replies && tweet.replies.length > 0;

  const clickHandler = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    let clickedElement = e.currentTarget.classList;
    console.log(clickedElement);
    if(clickedElement[0] === "tweet-container"){
      console.log("Tweet container clicked");
      history.push(`/${tweet.creatorHandle}/status/${tweet.id}`);
    }
    if (clickedElement[1] === "heart-button") {
      setHeartClicked((prev) => !prev);
      if (!heartClicked) {
        dispatch(likeTweet({ ...tweet }));
        dispatch(addLikedTweet({ ...tweet }));

      }
      else {
        dispatch(unlikeTweet({ ...tweet }))
        dispatch(removeLikedTweet({...tweet}));
      }
      // heartClicked ? dispatch(unlikeTweet({ ...tweet })) : dispatch(likeTweet({ ...tweet }));
    }

    if (clickedElement[1] === "retweet-button") {
      setRetweetClicked((prev) => !prev);
    }

    if (clickedElement[1] === "reply-button") {
      setReplyClicked((prev) => !prev);
    }
  }

  const handleModalSubmit = () => {
    setReplyClicked(false);
  }

  const tweetChain = (tweet.replies || []).map(tweet => {
    return <Tweet key={tweet.id} tweet={tweet} type="child" />
  })
  return (
    <React.Fragment>
    <Modal
      show={replyClicked}
      onCancel={() => setReplyClicked(setReplyClicked((prev) => !prev))}
      header={"tweet"}
      contentClass="tweet__modal-content"
      footerClass="tweet__modal-actions"
      footer={<ComposeTweet type={tweet.type} mode="reply" modalSubmit = {handleModalSubmit} replyingTo={tweet.type === "parent" ? [tweet.id] : [...tweet.replyingTo, tweet.id]}></ComposeTweet>}
    >
      <div className="tweet-content">
        <div className="tweet-avatar">
          <img className="avatar" src={tweet.avatar} />
          <div className="reply-line">
          </div>
        </div>
        <div className="tweet-text">
          <div className="creator-name">
            {tweet.creatorName}
            <span className="creator-handle"> @{tweet.creatorHandle}</span>
            <span className="time-tweeted"> - {new Date(tweet.posted_at).toDateString()}</span>
          </div>
          <div>{tweet.content}</div>
          <div className="replying-to">Replying to <span>@{tweet.creatorHandle}</span></div>
        </div>

      </div>
    </Modal>
      <div className={`tweet-container ${tweet.focusedView ? "__focused" : ""} ${tweet.replies && tweet.replies.length > 0 ? "__replied" : ""}`} onClick={(event) => clickHandler(event)}>


        <div className="tweet-content">
          <div className="tweet-avatar">
            <img className="avatar" src={tweet.avatar} />
            {
              tweet.replies && tweet.replies.length > 0 && (<div className="reply-line"></div>)
            }
          </div>
          <div className="tweet-text">
            <div className="creator-name">
              {tweet.creatorName}
              <span className="creator-handle"> @{tweet.creatorHandle}</span>
              <span className="time-tweeted"> - {new Date(tweet.posted_at).toDateString()}</span>
            </div>
            <div>{tweet.content}</div>
          </div>

        </div>
        <div className="tweet-interaction-icons">
          <span className="fa-layers reply-button" onClick={clickHandler} >
            <FontAwesomeIcon
              icon={faComment}
              size="lg"
              color="#778899"
              className="reply-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="3x"
              color="rgba(29, 161, 242, 0.1)"
              className="reply-circle-icon"
              transform="left-4.5"
            />
            <span className="reply-counter">{tweet.replyCount}</span>
          </span>

          <span className={`fa-layers retweet-button ${retweetClicked ? "__clicked" : ""}`} onClick={clickHandler}>
            <FontAwesomeIcon
              icon={faRetweet}
              size="lg"
              color="#778899"
              className="retweet-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="3x"
              color="rgba(23, 191, 99, 0.1)"
              className="retweet-circle-icon"
              transform="left-3.5"
            />
            <span className="retweet-counter">{tweet.retweets}</span>
          </span>

          <span className={`fa-layers heart-button ${heartClicked ? "__clicked" : ""}`} onClick={clickHandler}>
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              color="#778899"
              className="heart-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="3x"
              color="rgb(224, 36, 94, 0.1)"
              className="heart-circle-icon"
              transform="left-4.2"
            />
            <span className="like-counter">{tweet.likes}</span>
          </span>

          <span className="fa-layers bookmark-button" onClick={clickHandler}>
            <FontAwesomeIcon
              icon={faBookmark}
              size="lg"
              color="#778899"
              className="bookmark-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="3x"
              color="rgba(29, 161, 242, 0.1)"
              className="bookmark-circle-icon"
              transform="left-5.4"
            />
          </span>
        </div>
      </div>
      {tweetChain}
    </React.Fragment>
  )
}

export default Tweet;