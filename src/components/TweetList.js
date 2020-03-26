import React from "react";
import Tweet from "./Tweet";

const TweetList = (props) => (
  props.timeline.map((tweet) => {
    return (
      <React.Fragment>
        <Tweet
          key={tweet.id}
          id={tweet.id}
          creatorName={tweet.creatorName}
          avatar={tweet.avatar}
          content={tweet.content}
          posted_at={tweet.posted_at}
          creatorHandle={tweet.creatorHandle}
          likes={tweet.likes}
          retweets={tweet.retweets}
          replyCount={tweet.replyCount}
          replies={tweet.replies}
        />
        {tweet.replies.length > 0 && (
          tweet.replies.map((tweet) => (
            <React.Fragment>
              <Tweet
                key={tweet.id}
                id={tweet.id}
                creatorName={tweet.creatorName}
                avatar={tweet.avatar}
                content={tweet.content}
                posted_at={tweet.posted_at}
                creatorHandle={tweet.creatorHandle}
                likes={tweet.likes}
                retweets={tweet.retweets}
                replyCount={tweet.replyCount}
                replies={tweet.replies}
              />
            </React.Fragment>
          )
          )
        )}
      </React.Fragment>

    )
  }
  )
)
export default TweetList;