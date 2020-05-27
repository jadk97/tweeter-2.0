import flattenTweets from "./flattenTweets";

const fetchInteractions = (userProfile) => {
  
  // check for retweets with children (might need to also implement a check for if the logged in user exists in retweetedBy)
  let retweetCheck = userProfile.tweets.filter((tweet) => tweet.retweetedBy.findIndex((user) => user.creatorHandle === userProfile.creatorHandle) > -1 && tweet.replyCount > 0);
    
    let getInteractions = [...userProfile.tweets];
    console.log("retweetCheck", retweetCheck);
    if(retweetCheck.length > 0){
      for (let retweet of retweetCheck){
        let tweetIndex = getInteractions.findIndex((tweet) => retweet.id === tweet.id);
        getInteractions[tweetIndex] = {...getInteractions[tweetIndex], replies: []};
      }
    }
  
    let flattenedInteractions = [...flattenTweets(getInteractions)];
    let notificationsFeed = [];
  
    for (let interaction of flattenedInteractions) {
      if(interaction.creatorHandle === userProfile.creatorHandle){
        if (interaction.likedBy.length > 0 && interaction.retweetedBy.length > 0) {
          notificationsFeed.push({ notifType: "like", ...interaction });
          notificationsFeed.push({ notifType: "retweet", ...interaction });
        }
        else if (interaction.likedBy.length > 0) {
          notificationsFeed.push({ notifType: "like", ...interaction });
        }
        else if (interaction.retweetedBy.length > 0) {
          notificationsFeed.push({ notifType: "retweet", ...interaction });
        }
      }
      else if (userProfile.retweetedTweets.some((tweet) => interaction.id === tweet.id)){
        // This is where you would put your logic for checking if someone interacted with a retweet the user made
        // Come back to this later when you have a back-end
        console.log("this is a retweet the user made", interaction);
  
      }
      else {
        notificationsFeed.push({ notifType: "reply", ...interaction })
      }
    }

    return notificationsFeed;
}

export default fetchInteractions;