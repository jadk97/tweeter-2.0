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
      replyCount: 4,
      retweets: 5,
      likes: 120
    },
    {
      id: 2,
      content: "I like apples, but not oranges.",
      posted_at: Date.now(),
      creatorName: "Ayn Rand",
      creatorHandle: "@AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      replyCount: 345,
      retweets: 500,
      likes: 2
    }
  ],
  reducers: {
    submitTweet: (state, action) => {
      state.unshift(action.payload);
    }
  }
});

export const { submitTweet } = slice.actions;


export const selectTimeline = state => state.timeline;

export default slice.reducer;