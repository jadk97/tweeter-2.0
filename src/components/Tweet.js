import React, { useState } from "react";
import "./Tweet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faCircle, faTimes, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Button from "./Button";
import ComposeTweet from "./ComposeTweet";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, addLikedTweet, removeLikedTweet, addRetweet, removeRetweet } from '../reducers/userProfileSlice';
import { likeTweet, unlikeTweet, retweetTweet, unretweetTweet } from "../reducers/timelineSlice";
import { selectTimeline } from "../reducers/timelineSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import DropDown from "./Dropdown";

const Tweet = ({ tweet, focusedView, childTweetToFocus, showMentions }) => {
  const userProfile = useSelector(selectUserProfile);
  let likedUserTweets = userProfile.likedTweets.some(likedTweet => likedTweet.id === tweet.id);
  // let retweetedUserTweets = userProfile.retweetedTweets(retweetedTweet => retweetedTweet.id === )
  let retweetedUserTweets = userProfile.retweetedTweets.some(retweetedTweet => retweetedTweet.id === tweet.id);
  console.log("likedUserTweets: ", likedUserTweets);
  // console.log("Has the user liked this tweet? ", likedUserTweets.
  // console.log("tweet being passed into Tweet component", tweet);
  const [heartClicked, setHeartClicked] = useState(likedUserTweets);
  const [retweetClicked, setRetweetClicked] = useState(retweetedUserTweets);
  const [replyClicked, setReplyClicked] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();
  console.log("THIS IS THE ID IN TWEET: ", id);
  // console.log(tweet.replies);
  // let hasReplies = tweet.replies && tweet.replies.length > 0;

  const clickHandler = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    let clickedElement = e.currentTarget.classList;
    console.log("This is the clicked element", clickedElement);
    if (clickedElement[0] === "creator-credentials" || clickedElement[0] === "avatar") {
      history.push(`/${tweet.creatorHandle}`);
    }
    if (clickedElement[0] === "replying-to-link") {
      let creatorLink = e.currentTarget.innerText;
      history.push(`/${creatorLink.substr(1)}`);
    }
    if (clickedElement[0] === "tweet-container") {
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
        dispatch(removeLikedTweet({ ...tweet }));
      }
      // heartClicked ? dispatch(unlikeTweet({ ...tweet })) : dispatch(likeTweet({ ...tweet }));
    }

    if (clickedElement[1] === "retweet-button") {
      setRetweetClicked((prev) => !prev);
      if (!retweetClicked) {
        let tweetToRetweet = { ...tweet, retweetedBy: [...tweet.retweetedBy, userProfile.creatorHandle] };
        console.log("this is the tweet to retweet", tweetToRetweet)
        dispatch(retweetTweet(tweetToRetweet));
        dispatch(addRetweet(tweetToRetweet));
      }
      else {
        let tweetToUnretweet = { ...tweet, retweetedBy: [userProfile.creatorHandle] };

        // console.log("index of retweet to remove", tweetIndex);
        // tweetToUnretweet.retweetedBy.splice(tweetIndex, 1);
        dispatch(unretweetTweet(tweetToUnretweet));
        dispatch(removeRetweet({ ...tweet }));
      }
    }

    if (clickedElement[1] === "reply-button") {
      setReplyClicked((prev) => !prev);
    }
  }

  const handleModalSubmit = () => {
    setReplyClicked(false);
  }

  // let usersRepliedTo = new Set();
  // usersRepliedTo.add(tweet.creatorHandle);
  // console.log(usersRepliedTo);

  const tweetChain = (tweet.replies || []).map((tweet, i) => {
    if (i === 0) {
      console.log("this is the index of the tweet: ", tweet);
    }
    return <Tweet key={tweet.id} tweet={tweet} type="child" showMentions={true} />
  })



  const abridgedTweetChain = (tweet.replies || []).map((tweet, i) => {
    if (i === 0) {
      // console.log("childTweetToFocus?: ", (typeof childTweetToFocus != "undefined") && (childTweetToFocus.id === tweet.id));
      if (childTweetToFocus) {

        console.log("this is the tweet id:", tweet.id);
        console.log("this is the childtweettofocus", childTweetToFocus.id === tweet.id);
        return <Tweet key={tweet.id} tweet={tweet} childTweetToFocus={childTweetToFocus} focusedView={childTweetToFocus.id === tweet.id} />
      }
      return <Tweet key={tweet.id} tweet={tweet} childTweetToFocus={childTweetToFocus} type="child" />
    }
  })

  let retweetIndicator;
  if (tweet.retweetedBy.length > 0) {
    console.log("the tweet has been retweeted");
    if (tweet.retweetedBy.includes(userProfile.creatorHandle)) {
      retweetIndicator = "You retweeted this";
    }
    else if (tweet.retweetedBy.length === 1 && !tweet.retweetedBy.includes(userProfile.creatorHandle)) {
      retweetIndicator = `${tweet.retweetedBy[0]} Retweeted`;
    }
    else {
      let isPlural = (tweet.retweetedBy.length - 2) > 1;
      tweet.retweetedBy.length > 2 ? retweetIndicator = `${tweet.retweetedBy.slice(-2).join(", ")} & ${tweet.retweetedBy.length - 2} ${isPlural ? "others Retweeted" : "other Retweeted"}` : retweetIndicator = `${tweet.retweetedBy.join(" & ")} Retweeted`;
    }
  }

  let mentionsChain;

  // let isPlural = (tweet.retweetedBy.length - 2) > 1;
  if (tweet.mentions.length > 1) {
    mentionsChain = tweet.mentions.map((mention, i) => {
      if (i === tweet.mentions.length - 1) {
        // console.log("last index", mention);
        return <span>&<span className="replying-to-link" onClick={(event) => clickHandler(event)}>@{mention}</span></span>
      }
      else {
        return <span><span className="replying-to-link" onClick={(event) => clickHandler(event)}>@{mention}</span>, </span>
      }
    })
  }
  else {
    mentionsChain = <span className="replying-to-link" onClick={(event) => clickHandler(event)}>@{tweet.mentions[0]}</span>
  }
  // }
  // mentionsChain = tweet.mentions.map((mention, i) => (
  //   <span className="replyingto-link" onClick={(event) => clickHandler(event)}>{mention}</span>
  // ));

  // console.log("This is the mentionsChain", mentionsChain);
  console.log("These are the mentions", tweet.mentions);

  console.log("THIS IS ME LOGGING THE tweet VARIABLE INSIDE TWEET.JS: ", focusedView)
  // console.log("THIS IS THE TWEETCHAIN:", abridgedTweetChain);
  console.log("does this have __replied?", tweet.replies.length > 0);
  return (
    <React.Fragment>
      <Modal
        show={replyClicked}
        onCancel={() => setReplyClicked(setReplyClicked((prev) => !prev))}
        header={
          <span className="fa-layers close-button" onClick={() => setReplyClicked(setReplyClicked((prev) => !prev))} >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              color="#1da1f2"
              className="close-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="2x"
              color="rgba(29, 161, 242, 0.1)"
              className="close-circle-icon"
            />
          </span>}
        contentClass="tweet__modal-content"
        headerClass="tweet__modal-header"
        footerClass="tweet__modal-actions"
        footer={<ComposeTweet type={tweet.type} mode="reply" modalSubmit={handleModalSubmit} replyingTo={tweet.type === "parent" ? [tweet.id] : [...tweet.replyingTo, tweet.id]} mentions={new Set([tweet.creatorHandle, ...tweet.mentions])}></ComposeTweet>}
      >
        <div className="tweet-content">
          <div className="tweet-avatar">
            <img className="avatar" src={tweet.avatar} />
            <div className="reply-line">
            </div>
          </div>
          <div className="tweet-text">
            <div className="creator-details">
              <span className="creator-name">{tweet.creatorName}</span>

              <span className="creator-handle"> @{tweet.creatorHandle}</span>
              <span className="time-tweeted"> - {new Date(tweet.posted_at).toDateString()}</span>
            </div>
            <div>{tweet.content}</div>
            <div className="replying-to">Replying to <span>@{tweet.creatorHandle}</span></div>
          </div>

        </div>
      </Modal>

      <div className={`tweet-container ${focusedView ? "__focused" : ""} ${tweet.replies && tweet.replies.length > 0 ? "__replied" : ""}`} onClick={(event) => clickHandler(event)}>
        {retweetIndicator && (
          <div className="tweet-retweeted">
            <FontAwesomeIcon
              icon={faRetweet}
              size="sm"
              color="#778899"
              className="retweet-icon"
            />
            <span>{retweetIndicator}</span>
          </div>
        )}
        {focusedView ? (
          <React.Fragment>
            <div className="tweet-content">

              <div className="tweet-avatar">
                <img className="avatar" src={tweet.avatar} onClick={clickHandler} />
                {
                  tweet.replies && tweet.replies.length > 0 && (<div className="reply-line"></div>)
                }
              </div>
              <div className="tweet-text">
                <div className="creator-details" onClick={clickHandler}>
                  <span className="creator-name">{tweet.creatorName}</span>
                  <div className="creator-handle"> @{tweet.creatorHandle}</div>
                </div>
              </div>
            </div>
            {tweet.type === "child" && <div className="tweet-mentions">Replying To {mentionsChain}</div>}
            <div className="tweet-body">
              {tweet.content}
              <div className="time-tweeted"> {new Date(tweet.posted_at).toDateString()}</div>
            </div>
            <div className={`tweet-stats ${tweet.likes === 0 && tweet.retweets === 0 ? "__none" : ""}`}>
              {tweet.likes > 0 && <div>
                <span>{tweet.likes}</span> Likes
                  </div>}
              {tweet.retweets > 0 && <div>
                <span>{tweet.retweets}</span> Retweets
                    </div>}
            </div>
          </React.Fragment>
        ) : (
            <div className="tweet-content">
              <div className="tweet-avatar">
                <img className="avatar" src={tweet.avatar} onClick={clickHandler} />
                {
                  tweet.replies && tweet.replies.length > 0 && (<div className="reply-line"></div>)
                }
              </div>

              <div className="tweet-text">
                <div className="creator-details" >
                  <span className="creator-credentials" onClick={clickHandler}>
                    <span className="creator-name">{tweet.creatorName}</span>
                    <span className="creator-handle"> @{tweet.creatorHandle}</span>
                  </span>
                  <span className="time-tweeted"> - {new Date(tweet.posted_at).toDateString()}</span>
                  <DropDown buttonClass="tweet" clickBind={clickHandler} tweet={tweet} />

                </div>
                {showMentions && <div className="tweet-mentions">Replying To {mentionsChain}</div>}
                <div className="tweet-body">{tweet.content}</div>
              </div>
            </div>
          )}

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
            {!focusedView && (
              <span className="reply-counter">{tweet.replyCount}</span>
            )}
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
            {!focusedView && (
              <span className="retweet-counter">{tweet.retweets}</span>
            )}
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
            {!focusedView && (
              <span className="like-counter">{tweet.likes}</span>
            )}
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

      {focusedView ? tweetChain : abridgedTweetChain}


    </React.Fragment>
  )
}

export default Tweet;