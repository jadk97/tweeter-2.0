import { createSlice } from "@reduxjs/toolkit";


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
      replyCount: 0,
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

    //   console.log(action.payload.replyingTo);
    //   state.unshift(action.payload);
    //   let replyChain = action.payload.replyingTo;
    //   console.log("This is the replyChain", replyChain);
    //   for (let reply of replyChain){
    //     let tweetRepliedTo= state.findIndex((tweet) => tweet.id === reply);
    //     state[tweetRepliedTo].replies.push(action.payload);
    //     state[tweetRepliedTo].replyCount++;
    //   }
    //   console.log("THIS IS THE CURRENT STATE", state);
    //   // let tweetRepliedTo = state.findIndex((tweet) => tweet.id === action.payload.replyingTo[0]);
    //   // console.log("This is tweetReplidTo inside timelineSlice.js", tweetRepliedTo);
    //   // state[tweetRepliedTo].replies.push(action.payload);
    //   // state[tweetRepliedTo].replyCount++;
    // }
  }
}
});

export const { submitTweet, replyTweet } = slice.actions;


export const selectTimeline = state => state.timeline;

export default slice.reducer;