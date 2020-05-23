import React, { useState, useRef, useEffect } from "react";
import "./ComposeTweet.css";
import TextareaAutosize from 'react-textarea-autosize';
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { useTweetInteract } from "../hooks/tweet-interact-hook";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, addTweet } from '../reducers/userProfileSlice';
import { submitTweet, replyTweet, selectTimeline } from "../reducers/timelineSlice";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import TweetInput from "./TweetInput/TweetInput";
const ComposeTweet = (props) => {
  const [tweet, setTweet] = useState("");
  const [usersMentioned, setUsersMentioned] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  // const tweet = useRef("");
  const userProfile = useSelector(selectUserProfile);
  // const timeline = useSelector(selectTimeline);
  const dispatch = useDispatch();
  let history = useHistory();
  // const setTweetText = (text) => {
  //   setTweet(text);

  // }
  // const setUsersMentionedArray = () => {
  //   // let rawMentions = mentions;
  //   // let mentionArray = Object.values(rawMentions).map(entity => {
  //   //   return entity.data.mention.name;
  //   // });
  //   // let mentionSet = [...new Set(mentions)];
  //   setUsersMentioned(usersMentioned);
   
  //   // console.log(usersMentioned);
  // }

  const handleAvatarClick = () => {
    history.push(`/${userProfile.creatorHandle}`);
  }

  
  const handleInputSubmit = (tweets, mentions) => {
    console.log(mentions);
    setTweet(tweets);
    setUsersMentioned(mentions);
    // setUsersMentioned(mentions);
    setSubmitting(true);
    // handleSubmit();
    // setUsersMentionedArray()
  }

  // console.log(usersMentioned);
  
  const handleSubmit = () => {

    console.log(usersMentioned);
    // console.log(timeline)
    // e.preventDefault();
    // console.log("This is props.replyingTo:", props.replyingTo);
    if (props.mode === "reply") {
      if (props.type === "child") {
        let replies = []
        // let parent = timeline.filter((parentTweet) => {
        //  return parentTweet.id === props.replyingTo[0];
        // });
        // console.log("This is the parent: ", parent);
      }
      let id = uuid();
      dispatch(replyTweet({
        id: id,
        type: "child",
        content: tweet,
        posted_at: Date.now(),
        creatorName: userProfile.creatorName,
        creatorHandle: userProfile.creatorHandle,
        avatar: userProfile.avatar,
        replyCount: 0,
        retweetedBy: [],
        likedBy: [],
        replies: [],
        retweets: 0,
        likes: 0,
        mentions: [...props.mentions],
        replyingTo: [...props.replyingTo]
      }));

      dispatch(addTweet({
        id: id,
        type: "child",
        content: tweet,
        posted_at: Date.now(),
        creatorName: userProfile.creatorName,
        creatorHandle: userProfile.creatorHandle,
        avatar: userProfile.avatar,
        replyCount: 0,
        replies: [],
        retweetedBy: [],
        likedBy: [],
        retweets: 0,
        likes: 0,
        mentions: [...props.mentions],
        replyingTo: [...props.replyingTo]
      }))
      props.modalSubmit();
    }
    else {
      let id = uuid();
      dispatch(submitTweet({
        id: id,
        type: "parent",
        content: tweet,
        posted_at: Date.now(),
        creatorName: userProfile.creatorName,
        creatorHandle: userProfile.creatorHandle,
        avatar: userProfile.avatar,
        replyCount: 0,
        mentions: [...usersMentioned],
        retweetedBy: [],
        likedBy: [],
        replies: [],
        retweets: 0,
        likes: 0
      }));

      dispatch(addTweet({
        id: id,
        type: "parent",
        content: tweet,
        posted_at: Date.now(),
        creatorName: userProfile.creatorName,
        creatorHandle: userProfile.creatorHandle,
        avatar: userProfile.avatar,
        replyCount: 0,
        mentions: [...usersMentioned],
        retweetedBy: [],
        likedBy: [],
        replies: [],
        retweets: 0,
        likes: 0
      }))
    }
    
    setTweet("");
    setUsersMentioned([])
    setSubmitting(false);
  }


  useEffect(() => {
    if(submitting === true){
      handleSubmit();
    }
  }, [submitting, handleSubmit])
  
  const oldComposeTweet = (
    <div className="compose-tweet">
      <form onSubmit={handleSubmit}>
        <div className="tweet-box">
          <img className="avatar" src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA"} onClick={handleAvatarClick} />
          {
            // <TextareaAutosize
            //   value={tweet}
            //   className={`tweet-input${tweet.length > 0 ? " __filled" : ""}`}
            //   placeholder="What's on your mind?"
            //   onChange={handleChange}
            // ></TextareaAutosize>
          }



        </div>
        <div className="tweet-submit-options">
          <div className="tweet-submit-image-icon">
            <FontAwesomeIcon icon={faImages} size="lg" color="#1da1f2" />
          </div>
          <div className="tweet-submit-button">
            <div className={`character-counter ${tweet.length > 140 ? "__limit-reached" : " "}`}>
              <p>
                {140 - tweet.length}
              </p>
            </div>
            <Button disabled={tweet.length === 0 || (tweet.length > 140)}>{props.type === "reply" ? "Reply" : "Tweet"}</Button>
          </div>
        </div>
      </form>
    </div>
  );


  return (
    <TweetInput
      handleAvatarClick={handleAvatarClick}
      handleInputSubmit={handleInputSubmit}
      buttonType={props.mode}
      avatar={userProfile.avatar}
    />

  )
}

export default ComposeTweet;