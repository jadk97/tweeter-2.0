import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const slice = createSlice({
  name: "timeline",
  initialState: [
    {
      id: 1,
      content: "What tweeterific tweet",
      posted_at: Date.now(),
      creatorName: "Ayn Rand",
      creatorHandle: "@AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      replyCount: 0,
      retweets: 5,
      likes: 120,
      replies: []
    },
    {
      id: 2,
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
      console.log(action.payload.replyingTo);
      let tweetRepliedTo = state.findIndex((tweet) => tweet.id === action.payload.replyingTo);
      state[tweetRepliedTo].replies.push(action.payload);
      state[tweetRepliedTo].replyCount++;
    }
  }
});

export const { submitTweet, replyTweet } = slice.actions;


export const selectTimeline = state => state.timeline;

export default slice.reducer;