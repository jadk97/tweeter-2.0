import { createSlice } from "@reduxjs/toolkit";
import findPath from "../helpers/findPath";

import _ from "lodash";

export const slice = createSlice({
  name: "timeline",
  initialState: [
    {
      id: "tweet1",
      type: "parent",
      content: "What tweeterific tweet",
      posted_at: Date.now(),
      creatorName: "Ayn Rand",
      creatorHandle: "@AtlasShrugged",
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
        creatorHandle: "@AtlasShrugged",
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
      creatorHandle: "@AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      replyCount: 0,
      retweets: 500,
      likes: 2,
      replies: []
    }
  ],
  reducers: {
    submitTweet: (state, action) => {
      state.unshift(action.payload);
    },
    replyTweet: (state, action) => {
      let tweetRepliedTo = action.payload.replyingTo[action.payload.replyingTo.length - 1];

      let pathToTweet = findPath(tweetRepliedTo, state).split(".");
      console.log("THE CURRENT PATH TO TWEET IS:", _.get(state, pathToTweet));
      let parentTweet = state.findIndex((tweet) => tweet.id === action.payload.replyingTo[0]);
      console.log("THIS IS THE PARENT TWEET: ", parentTweet);
      if (state[parentTweet].id !== _.get(state, pathToTweet)) {
        state[parentTweet].replyCount++;

      }
      pathToTweet[pathToTweet.length - 1] = "replies";


      _.set(state, pathToTweet, [..._.get(state, pathToTweet), action.payload]);
      pathToTweet[pathToTweet.length - 1] = "replyCount";
      _.set(state, pathToTweet, _.get(state, pathToTweet) + 1)
      // if(parentTweet)
    },
    likeTweet: (state, action) => {
      console.log(action.payload);
    }
  }
});

export const { submitTweet, replyTweet, likeTweet } = slice.actions;


export const selectTimeline = state => state.timeline;

export default slice.reducer;