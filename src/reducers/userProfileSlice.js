import { createSlice } from "@reduxjs/toolkit";




export const slice = createSlice({
  name: "userProfile",
  initialState: {
    creatorName: "John Doe",
    avatar: "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA",
    creatorHandle: "JohnDoe",
    likedTweets: [],
    tweets: []
  },
  reducers: {
    getUser: state => state,
    addLikedTweet: (state, action) => {
      state.likedTweets.push(action.payload);
    },
    removeLikedTweet: (state, action) => {
      let tweetToRemove = state.likedTweets.findIndex((tweet) => tweet.id === action.payload.id);
      console.log("THIS IS THE TWEET TO REMOVE", tweetToRemove);
      state.likedTweets.splice(tweetToRemove, 1);
    }
  }
});

export const { getUser, addLikedTweet, removeLikedTweet } = slice.actions;


export const selectUserProfile = state => state.userProfile;

export default slice.reducer;