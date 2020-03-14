import React, { useState } from "react";
import "./ComposeTweet.css";
import TextareaAutosize from 'react-textarea-autosize';
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
const ComposeTweet = (props) => {
  const [tweet, setTweet] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setTweet(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleTweetSubmit(tweet);
  }

  return (
    <div className="compose-tweet">
      <form onSubmit={handleSubmit}>
        <div className="tweet-box">
          <img className="avatar" src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA"} />
          <TextareaAutosize
            className={`tweet-input${tweet.length > 0 ? " __filled" : "" }`}
            placeholder="What's on your mind?"
            onChange={handleChange}
          ></TextareaAutosize>

        </div>
        <div className="tweet-submit-options">
          <div className="tweet-submit-image-icon">
            <FontAwesomeIcon icon={faImages} size="2x" color="#1da1f2" />
          </div>
          <div className="tweet-submit-button">
            <div className={`character-counter ${tweet.length > 140 ? "__limit-reached" : " "}`}>
              <p>
                {140 - tweet.length}
              </p>
            </div>
            <Button disabled={tweet.length === 0 || (tweet.length > 140)}>Tweet</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ComposeTweet;