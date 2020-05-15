import React from "react";
// import NotificationList from "./NotificationList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./NotificationListItem.css";
const NotificationListItem = (props) => {
  let userList = [
    {
      creatorName: "Ayn Rand",
      creatorHandle: "AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      bio: "I wrote The Fountainhead and Atlas Shrugged",
      joined: Date.now(),
      website: "https://en.wikipedia.org/wiki/Ayn_Rand",
      location: null,
      likedTweets: [{
        id: "tweet4",
        type: "parent",
        content: "Bananas",
        posted_at: Date.now(),
        creatorName: "Ernest Hemingway",
        creatorHandle: "EHemWay",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        mentions: [],
        retweetedBy: [],
        replies: []
      }],
      tweets: [{
        id: "tweet1",
        type: "parent",
        content: "What tweeterific tweet",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 1,
        retweets: 5,
        likes: 120,
        mentions: [],
        retweetedBy: [],
        replies: [{
          id: "tweet3",
          type: "child",
          content: "Oranges.",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
          replyCount: 0,
          retweets: 500,
          likes: 2,
          mentions: ["AtlasShrugged"],
          retweetedBy: [],
          replies: [],
          replyingTo: ["tweet1"]
        }]
      },
      {
        id: "tweet2",
        type: "parent",
        content: "I LIKE APPPLES AND APPLES AND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND APPLESAND",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        mentions: [],
        retweetedBy: [],
        replies: []
      },
      {
        id: "tweet3",
        type: "child",
        content: "Oranges.",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        mentions: ["AtlasShrugged"],
        retweetedBy: [],
        replies: [],
        replyingTo: ["tweet1"]
      }
      ]
    },
    {
      creatorName: "Ernest Hemingway",
      creatorHandle: "EHemWay",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
      bio: "I wrote For Whom the Bell Tolls",
      joined: Date.now(),
      website: null,
      location: "Oak Park, Illinois, U.S.",
      likedTweets: [],
      tweets: [{
        id: "tweet4",
        type: "parent",
        content: "Bananas",
        posted_at: Date.now(),
        creatorName: "Ernest Hemingway",
        creatorHandle: "EHemWay",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        mentions: [],
        retweetedBy: [],
        replies: [],
        replyingTo: []
      },
      {
        id: "tweet5",
        type: "parent",
        content: "But also pineapples.",
        posted_at: Date.now(),
        creatorName: "ErnestHemingway",
        creatorHandle: "EHemWay",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
        replyCount: 1,
        retweets: 500,
        likes: 2,
        mentions: [],
        retweetedBy: [],
        replies: [{
          id: "tweet6",
          type: "child",
          content: "Oranges.",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
          replyCount: 0,
          retweets: 500,
          likes: 2,
          mentions: ["EHemWay"],
          retweetedBy: [],
          replies: [],
          replyingTo: ["tweet5"]
        }],
        replyingTo: []
      }]
    }
  ];


  const notificationTextFormatter = (notifType) => {
    let notifChain;
    if (notifType.length > 1) {
      notifChain = notifType.map((notif, i) => {
        if (i === notifType.length - 1) {
          // console.log("last index", mention);
          return <span>and <span className="notification-link">{notif}</span></span>
        }
        else {
          return <span><span className="notification-link">{notif}</span>, </span>
        }
      })
    }
    else {
      notifChain = <span className="notification-link">{notifType[0]}</span>
    }
    return notifChain
  }
  // let isPlural = (tweet.retweetedBy.length - 2) > 1;
  return (
    <div className="notification-container">
      <div className="notification-content">
        {props.notifType === "like" &&
          (
            <div className="notification-type">
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                color="#e0245e"
                className="notification-icon"
              />

              <img className="notification-avatar" src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg"} />

            </div>
          )
        }
        <div>
          {props.notifType === "retweet" &&
            (
              <div className="notification-type">
                <FontAwesomeIcon
                  icon={faRetweet}
                  size="2x"
                  color="#17bf63"
                  className="notification-icon"
                />
                <img className="notification-avatar" src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg"} />
              </div>
            )
          }
        </div>
        <div className="notification-text">
          <p>{notificationTextFormatter(props.likedBy)}</p>
          <p className="notification-tweet-text">{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationListItem;