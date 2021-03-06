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
import ImageModal from "./ImageModal";
import reactStringReplace from "react-string-replace";

const Tweet = ({ tweet, focusedView, childTweetToFocus, showMentions }) => {
  const userProfile = useSelector(selectUserProfile);
  let likedUserTweets = userProfile.likedTweets.some(likedTweet => likedTweet.id === tweet.id);
  // let retweetedUserTweets = userProfile.retweetedTweets(retweetedTweet => retweetedTweet.id === )
  let retweetedUserTweets = userProfile.retweetedTweets.some(retweetedTweet => retweetedTweet.id === tweet.id);
  // console.log("likedUserTweets: ", likedUserTweets);
  // console.log("Has the user liked this tweet? ", likedUserTweets.
  // console.log("tweet being passed into Tweet component", tweet);
  const [heartClicked, setHeartClicked] = useState(likedUserTweets);
  const [retweetClicked, setRetweetClicked] = useState(retweetedUserTweets);
  const [replyClicked, setReplyClicked] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  let { id } = useParams();

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
        dispatch(likeTweet({
          ...tweet, likedBy: [...tweet.likedBy, {
            creatorName: userProfile.creatorName,
            creatorHandle: userProfile.creatorHandle,
            avatar: userProfile.avatar,
            bio: userProfile.bio
          }]
        }));
        dispatch(addLikedTweet({
          ...tweet, likedBy: [...tweet.likedBy, {
            creatorName: userProfile.creatorName,
            creatorHandle: userProfile.creatorHandle,
            avatar: userProfile.avatar,
            bio: userProfile.bio
          }]
        }));

      }
      else {
        dispatch(unlikeTweet({
          ...tweet, likedBy: [{
            creatorName: userProfile.creatorName,
            creatorHandle: userProfile.creatorHandle,
            avatar: userProfile.avatar,
            bio: userProfile.bio
          }]
        }))
        dispatch(removeLikedTweet({ ...tweet }));
      }
      // heartClicked ? dispatch(unlikeTweet({ ...tweet })) : dispatch(likeTweet({ ...tweet }));
    }

    if (clickedElement[0] === "tweet-image" || clickedElement[0] === "tweet-image-focused") {
      setImageClicked(true);
    }

    if (clickedElement[1] === "retweet-button") {
      setRetweetClicked((prev) => !prev);
      if (!retweetClicked) {
        let tweetToRetweet = {
          ...tweet, retweetedBy: [...tweet.retweetedBy, {
            creatorName: userProfile.creatorName,
            creatorHandle: userProfile.creatorHandle,
            avatar: userProfile.avatar,
            bio: userProfile.bio
          }]
        };
        dispatch(retweetTweet(tweetToRetweet));
        dispatch(addRetweet(tweetToRetweet));
      }
      else {
        let tweetToUnretweet = {
          ...tweet, retweetedBy: [{
            creatorName: userProfile.creatorName,
            creatorHandle: userProfile.creatorHandle,
            avatar: userProfile.avatar,
            bio: userProfile.bio
          }]
        };

        // console.log("index of retweet to remove", tweetIndex);
        // tweetToUnretweet.retweetedBy.splice(tweetIndex, 1);
        dispatch(unretweetTweet(tweetToUnretweet));
        dispatch(removeRetweet({ ...tweet }));
      }
    }

    if (clickedElement[1] === "reply-button") {
      setImageClicked(false);
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
    return <Tweet key={tweet.id} tweet={tweet} type="child" showMentions={true} />
  })



  const abridgedTweetChain = (tweet.replies || []).map((tweet, i) => {
    if (i === 0) {
      // console.log("childTweetToFocus?: ", (typeof childTweetToFocus != "undefined") && (childTweetToFocus.id === tweet.id));
      if (childTweetToFocus) {
        return <Tweet key={tweet.id} tweet={tweet} childTweetToFocus={childTweetToFocus} focusedView={childTweetToFocus.id === tweet.id} />
      }
      return <Tweet key={tweet.id} tweet={tweet} childTweetToFocus={childTweetToFocus} type="child" />
    }
  })

  let retweetIndicator;
  let usersRetweeted = tweet.retweetedBy.map((user) => user.creatorHandle);
  // console.log(usersRetweeted);
  if (usersRetweeted.length > 0) {
    if (usersRetweeted.includes(userProfile.creatorHandle)) {
      retweetIndicator = "You retweeted this";
    }
    else if (usersRetweeted.length === 1 && !usersRetweeted.includes(userProfile.creatorHandle)) {
      retweetIndicator = `${usersRetweeted[0]} Retweeted`;
    }
    else {
      let isPlural = (usersRetweeted.length - 2) > 1;
      usersRetweeted.length > 2 ? retweetIndicator = `${usersRetweeted.slice(-2).join(", ")} & ${usersRetweeted.length - 2} ${isPlural ? "others Retweeted" : "other Retweeted"}` : retweetIndicator = `${usersRetweeted.join(" & ")} Retweeted`;
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



  // console.log("THIS IS THE TWEETCHAIN:", abridgedTweetChain);

  let formattedTweet;

  formattedTweet = reactStringReplace(tweet.content, /@(\w+)/g, (match, i) => (
    <span key={match + i} className="replying-to-link" onClick={(event) => clickHandler(event)}>@{match}</span>
  ));

  formattedTweet = reactStringReplace(formattedTweet, /#(\w+)/g, (match, i) => (
    <span key={match + i} className="tweet-hashtag">#{match}</span>
  ));

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
            <div>{formattedTweet}</div>
            <div className="replying-to">Replying to <span>@{tweet.creatorHandle}</span></div>
          </div>

        </div>
      </Modal>
      <ImageModal
        show={imageClicked}
        header={
          <span className="fa-layers close-button" onClick={() => setImageClicked(setImageClicked((prev) => !prev))} >
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              color="white"
              className="close-icon"
            />
            <FontAwesomeIcon
              icon={faCircle}
              size="3x"
              color="rgba(255, 255, 255, 0.2)"
              className="close-circle-icon"
              transform="left-4.5"
            />
          </span>
        }
        onCancel={() => setImageClicked(setImageClicked((prev) => !prev))}
        image={tweet.image}
        footer={<div className={`tweet-interaction-icons`}>
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
        </div>}
      />


      <div className={`tweet-container ${focusedView ? "__focused" : ""} ${tweet.replies && tweet.replies.length > 0 ? "__replied" : ""}`} onClick={(event) => clickHandler(event)}>
        {retweetIndicator && tweet.creatorHandle !== userProfile.creatorHandle && (
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
                <div className="creator-details">
                  <DropDown buttonClass="tweet" clickBind={clickHandler} tweet={tweet} focusedView={focusedView} />
                  <span className="creator-credentials" onClick={clickHandler}>
                    <span className="creator-name">{tweet.creatorName}</span>
                    <div className="creator-handle"> @{tweet.creatorHandle}</div>
                  </span>
                </div>
              </div>
            </div>
            {tweet.type === "child" && <div className="tweet-mentions">Replying To {mentionsChain}</div>}
            <div className="tweet-body">
              {formattedTweet}
              {tweet.image && <div className="tweet-image-focused" onClick={clickHandler}>
                <img src={tweet.image} />
              </div>}
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
                  tweet.replies && tweet.replies.length > 0 && (<div className={tweet.image ? "reply-line-with-image" : "reply-line"}></div>)
                }
              </div>

              <div className="tweet-text">
                <div className="creator-details" >
                  <DropDown buttonClass="tweet" clickBind={clickHandler} tweet={tweet} focusedView={focusedView} />
                  <span className="creator-credentials" onClick={clickHandler}>
                    <span className="creator-name">{tweet.creatorName}</span>
                    <span className="creator-handle"> @{tweet.creatorHandle}</span>
                  </span>
                  <span className="time-tweeted"> - {new Date(tweet.posted_at).toDateString()}</span>

                </div>
                {showMentions && <div className="tweet-mentions">Replying To {mentionsChain}</div>}
                <div className="tweet-body">
                  {formattedTweet}

                </div>
                {tweet.image && <div className="tweet-image" onClick={clickHandler}>
                  <img src={tweet.image} />
                  <p></p>
                </div>}
              </div>
            </div>
          )}

        <div className={`tweet-interaction-icons ${tweet.image && !focusedView ? "__with-image" : ""}`}>
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