import React from "react";
import Header from "./Header";
import TweetList from "../components/TweetList";

import { useParams } from "react-router-dom";
import { selectUserProfile } from "../reducers/userProfileSlice";
import { useSelector } from "react-redux";


const Profile = (props) => {
  let { creatorHandle } = useParams();
  const userProfile = useSelector(selectUserProfile);

  let userList = [
    {
      creatorName: "Ayn Rand",
      creatorHandle: "AynRand",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      bio: "I wrote The Fountainhead and Atlas Shrugged",
      joined: Date.now(),
      website: "https://en.wikipedia.org/wiki/Ayn_Rand",
      location: null,
      likedTweets: [],
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
      tweets: [ {
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
        replies: []
      },
      {
        id: "tweet5",
        type: "parent",
        content: "But also pineapples.",
        posted_at: Date.now(),
        creatorName: "ErnestHemingway",
        creatorHandle: "EHemWay",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        replies: []
      }]
    }
  ];

  let renderedUser = userList.filter((user) => user.creatorHandle === creatorHandle);
  console.log(renderedUser);
  return (
    <div className="center-view">
      <Header title={"@"+creatorHandle} />
      <div>
        Date joined: {new Date(renderedUser[0].joined).toDateString()}
        {renderedUser[0].bio}
      </div>
      <TweetList timeline={renderedUser[0].tweets} />
    </div>
  )
}

export default Profile;