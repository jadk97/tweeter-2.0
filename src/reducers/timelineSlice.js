import { createSlice } from "@reduxjs/toolkit";
import findPath from "../helpers/findPath";
import findKeys from "../helpers/findKeys";
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
      creatorHandle: "AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      replyCount: 7,
      retweets: 5,
      likes: 120,
      mentions: [],
      retweetedBy: [],
      likedBy: [],
      replies: [{
        id: "tweet3",
        type: "child",
        content: "Oranges.",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 2,
        retweets: 500,
        likes: 2,
        mentions: ["AtlasShrugged"],
        retweetedBy: [],
        likedBy: [],
        replies: [{
          id: "tweet8",
          type: "child",
          content: "Mangoes",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
          replyCount: 1,
          retweets: 500,
          likes: 2,
          mentions: ["AtlasShrugged"],
          retweetedBy: [],
          likedBy: [],
          replies: [{
            id: "tweet9",
            type: "child",
            content: "Clementines",
            posted_at: Date.now(),
            creatorName: "Ayn Rand",
            creatorHandle: "AtlasShrugged",
            avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
            replyCount: 0,
            retweets: 500,
            likes: 2,
            mentions: ["AtlasShrugged"],
            retweetedBy: [],
            likedBy: [],
            replies: [],
            replyingTo: ["tweet1", "tweet3", "tweet8"]
          }],
          replyingTo: ["tweet1", "tweet3"]
        },
        {
          id: "tweet10",
          type: "child",
          content: "Tell me about the tomatoes",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
          replyCount: 1,
          retweets: 500,
          likes: 2,
          mentions: ["AtlasShrugged"],
          retweetedBy: [],
          replies: [
            {
              id: "tweet11",
              type: "child",
              content: "They taste pretty good.",
              posted_at: Date.now(),
              creatorName: "Ayn Rand",
              creatorHandle: "AtlasShrugged",
              avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
              replyCount: 0,
              retweets: 500,
              likes: 2,
              mentions: ["AtlasShrugged"],
              retweetedBy: [],
              likedBy: [],
              replies: [],
              replyingTo: ["tweet10"]
            }
          ],
          replyingTo: ["tweet3"]
        }
        ],
        replyingTo: ["tweet1"]
      },
      {
        id: "tweet7",
        type: "child",
        content: "Papayas.",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 1,
        retweets: 500,
        likes: 2,
        mentions: ["AtlasShrugged"],
        retweetedBy: [],
        likedBy: [],
        replies: [{
          id: "tweet12",
          type: "child",
          content: "Papayas.",
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
          replyingTo: ["tweet1", "tweet7"]
        }],
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
      likedBy: [],
      replies: []
    },
    {
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
      likedBy: [],
      replies: [{
        id: "tweet6",
        type: "child",
        content: "Cherries.",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 0,
        retweets: 500,
        likes: 2,
        replies: [],
        mentions: ["EHemWay"],
        retweetedBy: [],
        likedBy: [],
        replyingTo: ["tweet4"]
      }]
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
      mentions: [],
      retweetedBy: ["AtlasShrugged"],
      likedBy: [],
      replies: [{
        id: "tweet13",
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
        mentions: ["EHemWay"],
        retweetedBy: [],
        likedBy: [],
        replyingTo: ["tweet5"]
      }]
    },
    {
      id: "tweet14",
      type: "parent",
      content: "Check this out!",
      posted_at: Date.now(),
      creatorName: "Ayn Rand",
      creatorHandle: "AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
      image: "https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg",
      replyCount: 0,
      retweets: 500,
      likes: 2,
      mentions: [],
      retweetedBy: [],
      likedBy: [],
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
      _.set(state, pathToTweet, _.get(state, pathToTweet) + 1);

    },
    likeTweet: (state, action) => {
      let tweetLiked = action.payload.id;
      let pathToTweet = findPath(tweetLiked, state).split(".");
      pathToTweet[pathToTweet.length - 1] = "likes";

      _.set(state, pathToTweet, _.get(state, pathToTweet) + 1);

      pathToTweet[pathToTweet.length - 1] = "likedBy";

      _.set(state, pathToTweet, action.payload.likedBy);
    },
    unlikeTweet: (state, action) => {
      let tweetUnliked = action.payload.id;
      let pathToTweet = findPath(tweetUnliked, state).split(".");
      pathToTweet[pathToTweet.length - 1] = "likes";

      _.set(state, pathToTweet, _.get(state, pathToTweet) - 1);

      pathToTweet[pathToTweet.length - 1] = "likedBy";
      let updatedLikedBy = [..._.get(state, pathToTweet)];
      let tweetIndex = updatedLikedBy.findIndex((user) => user === action.payload.likedBy[0]);
      updatedLikedBy.splice(tweetIndex, 1);
      console.log("updated retweet", updatedLikedBy);

      _.set(state, pathToTweet, updatedLikedBy);
    },
    retweetTweet: (state, action) => {
      let tweetRetweeted = action.payload.id;
      let pathToTweet = findPath(tweetRetweeted, state).split(".");
      pathToTweet[pathToTweet.length - 1] = "retweets";
      _.set(state, pathToTweet, _.get(state, pathToTweet) + 1);
      pathToTweet[pathToTweet.length - 1] = "retweetedBy";

      _.set(state, pathToTweet, action.payload.retweetedBy);
    },
    unretweetTweet: (state, action) => {
      let tweetUnretweeted = action.payload.id;
      let pathToTweet = findPath(tweetUnretweeted, state).split(".");
      pathToTweet[pathToTweet.length - 1] = "retweets";
      _.set(state, pathToTweet, _.get(state, pathToTweet) - 1);

      pathToTweet[pathToTweet.length - 1] = "retweetedBy";
      let updatedRetweetedBy = [..._.get(state, pathToTweet)];
      let tweetIndex = updatedRetweetedBy.findIndex((user) => user === action.payload.retweetedBy[0]);
      updatedRetweetedBy.splice(tweetIndex, 1);
      console.log("updated retweet", updatedRetweetedBy);

      _.set(state, pathToTweet, updatedRetweetedBy);
    },
    deleteTweet: (state, action) => {
      let tweetToDelete = action.payload.id;
      let pathToTweet = findPath(tweetToDelete, state).split(".");
      console.log("This is the path of the tweet to delete", pathToTweet);
      console.log("This is the tweet to delete", _.get(state, pathToTweet));
      let tweetIndex = state.findIndex((tweet) => tweet.id === tweetToDelete);
      console.log("This is the index of the tweet to delete", tweetIndex);

      if (tweetIndex === -1) {
        let updatedReplyCount;
        let tweetRepliedTo = action.payload.replyingTo[action.payload.replyingTo.length - 1];
        pathToTweet = findPath(tweetRepliedTo, state).split(".");

        console.log("THE CURRENT PATH TO TWEET TO DELETE FROM IS:", _.get(state, pathToTweet));
        let parentTweet = state.findIndex((tweet) => tweet.id === action.payload.replyingTo[0]);
        console.log("THIS IS THE PARENT TWEET TO DELETE: ", parentTweet);
        if (state[parentTweet].id !== _.get(state, pathToTweet)) {
          pathToTweet[pathToTweet.length - 1] = "replies";
          updatedReplyCount = _.get(state, pathToTweet).length;
          state[parentTweet].replyCount = updatedReplyCount;
        }
        console.log("if check wasn't hit");

        pathToTweet[pathToTweet.length - 1] = "replies";
        tweetIndex = _.get(state, pathToTweet).findIndex((tweet) => tweet.id === tweetToDelete);
        _.get(state, pathToTweet).splice(tweetIndex, 1);

        updatedReplyCount = findKeys(_.get(state, pathToTweet), "id").length;
        console.log("CURRENT UPDATED REPLYCOUNT", updatedReplyCount);
        pathToTweet[pathToTweet.length - 1] = "replyCount";
        console.log("CURRENT REPLYCOUNT: ", _.get(state, pathToTweet));
        _.set(state, pathToTweet, updatedReplyCount);
      }
      else {
        state.splice(tweetIndex, 1);
      }
    }
  }
});

export const { submitTweet, replyTweet, likeTweet, unlikeTweet, retweetTweet, unretweetTweet, deleteTweet } = slice.actions;


export const selectTimeline = state => state.timeline;

export default slice.reducer;