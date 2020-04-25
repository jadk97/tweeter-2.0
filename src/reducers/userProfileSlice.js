import { createSlice } from "@reduxjs/toolkit";
import findPath from "../helpers/findPath";
import _ from "lodash";


export const slice = createSlice({
  name: "userProfile",
  initialState: {
    creatorName: "John Doe",
    avatar: "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA",
    creatorHandle: "JohnDoe",
    bio: "I am but a simple test user",
    joined: Date.now(),
    location: null,
    website: null,
    likedTweets: [],
    retweetedTweets: [],
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
    },
    addTweet: (state, action) => {
      console.log("addtweet was called");
      if (action.payload.type === "child" && action.payload.mentions.includes(state.creatorHandle)) {
        console.log("its hittin");
        let tweetRepliedTo = action.payload.replyingTo[action.payload.replyingTo.length - 1];
        console.log("tweetRepliedTo in userProfile ", tweetRepliedTo);
        let pathToTweet = findPath(tweetRepliedTo, state.tweets).split(".");
        console.log("THE CURRENT USER PATH TO TWEET IS:", _.get(state.tweets, pathToTweet));

        // Make sure to stress test this later
        let parentTweet = state.tweets.findIndex((tweet) => tweet.id === action.payload.replyingTo[0]);
        if (parentTweet === -1) {
          parentTweet = state.tweets.findIndex((tweet) => tweet.id === tweetRepliedTo)
        }
        console.log("THIS IS THE PARENT TWEET: ", parentTweet);
        if (state.tweets[parentTweet].id !== _.get(state.tweets, pathToTweet)) {
          state.tweets[parentTweet].replyCount++;

        }
        pathToTweet[pathToTweet.length - 1] = "replies";


        _.set(state.tweets, pathToTweet, [..._.get(state.tweets, pathToTweet), action.payload]);
        pathToTweet[pathToTweet.length - 1] = "replyCount";
        _.set(state.tweets, pathToTweet, _.get(state.tweets, pathToTweet) + 1);
      }
      else {
        state.tweets.unshift(action.payload);
      }
    },
    removeTweet: (state, action) => {
      let tweetToRemove = state.tweets.findIndex((tweet) => tweet.id === action.payload.id);
      state.tweets.splice(tweetToRemove, 1);
    },
    addRetweet: (state, action) => {
      state.tweets.unshift(action.payload);
      state.retweetedTweets.unshift(action.payload);
    },
    removeRetweet: (state, action) => {
      let retweetToRemove = state.retweetedTweets.findIndex((tweet) => tweet.id === action.payload.id);
      state.retweetedTweets.splice(retweetToRemove, 1);
      retweetToRemove = state.tweets.findIndex((tweet) => tweet.id === action.payload.id);
      state.tweets.splice(retweetToRemove, 1);
    }
  }
});

export const { getUser, addLikedTweet, removeLikedTweet, addTweet, addRetweet, removeRetweet, removeTweet } = slice.actions;


export const selectUserProfile = state => state.userProfile;

export default slice.reducer;