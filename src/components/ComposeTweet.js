import React, { useState } from "react";
import "./ComposeTweet.css";
import TextareaAutosize from 'react-textarea-autosize';
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons'
const ComposeTweet = (props) => {
  const [tweet, setTweet] = useState("");
  return (
    <div className="compose-tweet">
      <form>
        <div className="tweet-box">
          <img className="avatar" src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA"} />
          <TextareaAutosize 
          className="tweet-input" 
          placeholder="What's on your mind?"

          ></TextareaAutosize>
         
        </div>
        <div className="tweet-submit-options">
        <div className="tweet-submit-image-icon">
        <FontAwesomeIcon icon={faImages} size="2x" color="#1da1f2" />
        </div>
        <Button>Tweet</Button>
        </div>
      </form>
    </div>
  )
}

export default ComposeTweet;