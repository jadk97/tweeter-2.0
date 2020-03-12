import React from "react";
import "./ComposeTweet.css";
import TextareaAutosize from 'react-textarea-autosize';
const ComposeTweet = (props) => {
  return (
    <div className="compose-tweet">
      <form>
        <div className="tweet-box">
          <img className="avatar" src={"https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA"} />
          <TextareaAutosize className="tweet-input" placeholder="What's on your mind?"></TextareaAutosize>
        </div>
      </form>
    </div>
  )
}

export default ComposeTweet;