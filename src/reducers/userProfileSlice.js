import { createSlice } from "@reduxjs/toolkit";
import findPath from "../helpers/findPath";
import _ from "lodash";


export const slice = createSlice({
  name: "userProfile",
  initialState: {
    creatorName: "John Doe",
    avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
    creatorHandle: "JohnDoe",
    bio: "I am but a simple test user",
    joined: Date.now(),
    location: null,
    website: null,
    likedTweets: [],
    retweetedTweets: [{
      id: "tweet5",
      type: "parent",
      content: "But also pineapples.",
      posted_at: Date.now(),
      creatorName: "Ernest Hemingway",
      creatorHandle: "EHemWay",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
      replyCount: 1,
      retweets: 500,
      likes: 2,
      mentions: [],
      retweetedBy: [
        {
          creatorName: "John Doe",
          creatorHandle: "JohnDoe",
          avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
          bio: "I am but a simple test user"
        },
        {
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          bio: "I wrote The Fountainhead and Atlas Shrugged"
        }
      ],
      likedBy: [],
      hashtags: [],
      replies: [{
        id: "tweet13",
        type: "child",
        content: "Oranges.",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        hashtags: [],
        replies: [],
        mentions: ["EHemWay"],
        retweetedBy: [],
        likedBy: [],
        replyingTo: ["tweet5"]
      }]
    }],
    tweets: [{
      id: "tweet5",
      type: "parent",
      content: "But also pineapples.",
      posted_at: Date.now(),
      creatorName: "Ernest Hemingway",
      creatorHandle: "EHemWay",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
      replyCount: 1,
      retweets: 500,
      likes: 2,
      mentions: [],
      retweetedBy: [
        {
          creatorName: "John Doe",
          creatorHandle: "JohnDoe",
          avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
          bio: "I am but a simple test user"
        },
        {
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          bio: "I wrote The Fountainhead and Atlas Shrugged"
        }
      ],
      likedBy: [],
      hashtags: [],
      replies: [{
        id: "tweet13",
        type: "child",
        content: "Oranges.",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        hashtags: [],
        replies: [],
        mentions: ["EHemWay"],
        retweetedBy: [],
        likedBy: [],
        replyingTo: ["tweet5"]
      }]
    },
    {
      id: "tweet15",
      type: "parent",
      content: "Hello World!",
      posted_at: Date.now(),
      creatorName: "John Doe",
      creatorHandle: "JohnDoe",
      avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
      replyCount: 0,
      retweets: 1,
      likes: 1,
      mentions: [],
      retweetedBy: [{
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        bio: "I wrote The Fountainhead and Atlas Shrugged"
      }],
      likedBy: [{
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        bio: "I wrote The Fountainhead and Atlas Shrugged"
      }],
      hashtags: [],
      replies: [{
        id: "tweet19",
        type: "child",
        content: "Hello World!",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        replyCount: 0,
        retweets: 1,
        likes: 1,
        mentions: ["JohnDoe"],
        retweetedBy: [],
        likedBy: [],
        hashtags: [],
        replies: [],
        replyingTo: ["tweet15"]
      }]
    },
    {
      id: "tweet16",
      type: "parent",
      content: "Hello again!",
      posted_at: Date.now(),
      creatorName: "John Doe",
      creatorHandle: "JohnDoe",
      avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
      replyCount: 1,
      retweets: 1,
      likes: 1,
      mentions: [],
      retweetedBy: [{
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        bio: "I wrote The Fountainhead and Atlas Shrugged"
      }],
      likedBy: [{
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        bio: "I wrote The Fountainhead and Atlas Shrugged"
      }],
      hashtags: [],
      replies: [{
        id: "tweet17",
        type: "child",
        content: "My dearest friend",
        posted_at: Date.now(),
        creatorName: "John Doe",
        creatorHandle: "JohnDoe",
        avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
        replyCount: 0,
        retweets: 1,
        likes: 1,
        mentions: ["JohnDoe"],
        retweetedBy: [{
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          bio: "I wrote The Fountainhead and Atlas Shrugged"
        }],
        likedBy: [{
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          bio: "I wrote The Fountainhead and Atlas Shrugged"
        },
        {
          creatorName: "Ernest Hemingway",
          creatorHandle: "EHemWay",
          avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
          bio: "I wrote For Whom the Bell Tolls"
        }],
        hashtags: [],
        replies: [],
        replyingTo: ["tweet16"]
      }]
    },
    {
      id: "tweet18",
      type: "parent",
      content: "Goodbye for now!",
      posted_at: Date.now(),
      creatorName: "John Doe",
      creatorHandle: "JohnDoe",
      avatar: "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
      replyCount: 0,
      retweets: 1,
      likes: 1,
      mentions: [],
      retweetedBy: [{
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
        bio: "I wrote The Fountainhead and Atlas Shrugged"
      },
      {
        creatorName: "Ernest Hemingway",
        creatorHandle: "EHemWay",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
        bio: "I wrote For Whom the Bell Tolls"
      }],
      likedBy: [],
      hashtags: [],
      replies: []
    }],
    following: [],
    followers: [
      {
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
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
          hashtags: [],
          replies: []
        }],
        tweets: [{
          id: "tweet1",
          type: "parent",
          content: "What tweeterific tweet",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          replyCount: 1,
          retweets: 5,
          likes: 120,
          mentions: [],
          retweetedBy: [],
          hashtags: [],
          replies: [{
            id: "tweet3",
            type: "child",
            content: "Oranges.",
            posted_at: Date.now(),
            creatorName: "Ayn Rand",
            creatorHandle: "AtlasShrugged",
            avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
            replyCount: 0,
            retweets: 500,
            likes: 2,
            mentions: ["AtlasShrugged"],
            retweetedBy: [],
            hashtags: [],
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
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          replyCount: 0,
          retweets: 500,
          likes: 2,
          mentions: [],
          retweetedBy: [],
          hashtags: [],
          replies: []
        },
        {
          id: "tweet3",
          type: "child",
          content: "Oranges.",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://i.insider.com/4f3aae4869beddff2a00004f?width=400&format=jpeg",
          replyCount: 0,
          retweets: 500,
          likes: 2,
          mentions: ["AtlasShrugged"],
          retweetedBy: [],
          hashtags: [],
          replies: [],
          replyingTo: ["tweet1"]
        }
        ]
      }]
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
      if (action.payload.creatorHandle === state.creatorHandle) {
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
      // consider adding some logic that shifts the retweet to the top of the profile page
      // unshifting the tweet again if it already exists in state causes problems with React because of duplicate keys
      if (action.payload.creatorHandle === state.creatorHandle) {
        let pathToTweet = findPath(action.payload.id, state.tweets).split(".");
        pathToTweet[pathToTweet.length - 1] = "retweets";
        _.set(state.tweets, pathToTweet, _.get(state.tweets, pathToTweet) + 1);
        state.retweetedTweets.unshift(action.payload);
      }
      else {
        state.tweets.unshift(action.payload);
        state.retweetedTweets.unshift(action.payload);
      }
    },
    removeRetweet: (state, action) => {
      if (action.payload.creatorHandle === state.creatorHandle) {
        let pathToTweet = findPath(action.payload.id, state.tweets).split(".");
        pathToTweet[pathToTweet.length - 1] = "retweets";
        _.set(state.tweets, pathToTweet, _.get(state.tweets, pathToTweet) - 1);
        let retweetToRemove = state.retweetedTweets.findIndex((tweet) => tweet.id === action.payload.id);
        state.retweetedTweets.splice(retweetToRemove, 1);
      }
      else {
        let retweetToRemove = state.retweetedTweets.findIndex((tweet) => tweet.id === action.payload.id);
        state.retweetedTweets.splice(retweetToRemove, 1);
        retweetToRemove = state.tweets.findIndex((tweet) => tweet.id === action.payload.id);
        state.tweets.splice(retweetToRemove, 1);
      }
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