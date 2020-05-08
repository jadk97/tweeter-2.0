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
    tweets: [],
    following: [],
    followers: []
  },
  reducers: {
    getUser: state => state,
    addLikedTweet: (state, action) => {
      if (action.payload.creatorHandle === state.creatorHandle) {
        let pathToTweet = findPath(action.payload.id, state.tweets).split(".");
        pathToTweet[pathToTweet.length - 1] = "likes";
        _.set(state.tweets, pathToTweet, _.get(state.tweets, pathToTweet) + 1);
      }
      state.likedTweets.push({ ...action.payload, likes: action.payload.likes + 1 })

    },
    removeLikedTweet: (state, action) => {
      if (action.payload.creatorHandle === state.creatorHandle){
        let pathToTweet = findPath(action.payload.id, state.tweets).split(".");
        pathToTweet[pathToTweet.length - 1] = "likes";
        _.set(state.tweets, pathToTweet, _.get(state.tweets, pathToTweet) - 1);
      }
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
          // let parentPath = [...pathToTweet];
          // parentPath.pop();
          // parentTweet = _.get(state.tweets, parentPath);
          // console.log(parentTweet);
        }
        console.log("THIS IS THE PARENT TWEET: ", parentTweet);
        // if(parentTweet !== -1){
        if (state.tweets[parentTweet] && (state.tweets[parentTweet].id !== _.get(state.tweets, pathToTweet))) {
          state.tweets[parentTweet].replyCount++;

        }
        // }
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
      let tweetToRemove = action.payload.id;
      let pathToTweet = findPath(tweetToRemove, state.tweets).split(".");
      console.log("This is the path of the tweet to delete", pathToTweet);
      console.log("This is the tweet to delete", _.get(state.tweets, pathToTweet));
      let tweetIndex = state.tweets.findIndex((tweet) => tweet.id === tweetToRemove);
      console.log("This is the index of the tweet to delete", tweetIndex);

      if (tweetIndex === -1) {
        let updatedReplyCount;
        let tweetRepliedTo = action.payload.replyingTo[action.payload.replyingTo.length - 1];
        pathToTweet = findPath(tweetRepliedTo, state.tweets).split(".");

        console.log("THE CURRENT PATH TO TWEET TO DELETE FROM IS:", _.get(state.tweets, pathToTweet));
        let parentTweet = state.tweets.findIndex((tweet) => tweet.id === action.payload.replyingTo[0]);
        console.log("THIS IS THE PARENT TWEET TO DELETE: ", parentTweet);
        if (state.tweets[parentTweet] && (state.tweets[parentTweet].id !== _.get(state.tweets, pathToTweet))) {
          pathToTweet[pathToTweet.length - 1] = "replies";
          updatedReplyCount = _.get(state.tweets, pathToTweet).length;
          state.tweets[parentTweet].replyCount = updatedReplyCount;
        }

        console.log("if check wasn't hit");

        pathToTweet[pathToTweet.length - 1] = "replies";
        tweetIndex = _.get(state.tweets, pathToTweet).findIndex((tweet) => tweet.id === tweetToRemove);
        _.get(state.tweets, pathToTweet).splice(tweetIndex, 1);

        updatedReplyCount = _.get(state.tweets, pathToTweet).length;
        console.log("CURRENT UPDATED REPLYCOUNT", updatedReplyCount);
        pathToTweet[pathToTweet.length - 1] = "replyCount";
        console.log("CURRENT REPLYCOUNT: ", _.get(state.tweets, pathToTweet));
        _.set(state.tweets, pathToTweet, updatedReplyCount);
      }
      else {
        state.tweets.splice(tweetIndex, 1);
      }
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
    },
    followUser: (state, action) => {
      state.following.push(action.payload);
    },
    unfollowUser: (state, action) => {
      let userToUnfollow = state.following.findIndex((user) => user.creatorHandle === action.payload.creatorHandle);
      state.following.splice(userToUnfollow, 1);
    }
  }
});

export const { getUser, addLikedTweet, removeLikedTweet, addTweet, addRetweet, removeRetweet, removeTweet, followUser, unfollowUser } = slice.actions;


export const selectUserProfile = state => state.userProfile;

export default slice.reducer;