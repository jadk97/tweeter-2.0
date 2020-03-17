import { useState, useCallback, useEffect } from "react";



export const useTweetInteract = (() => {
  const TEMP_PROFILE = {
    id: "12345",
    creatorName: "John Doe",
    avatar: "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2017/04/04/604513.jpg?itok=FqqfYOfA",
    posted_at: Date.now(),
    creatorHandle: "@JohnDoe"
  }
  const TWEETS = [
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
  ];
  const [timeline, setTimeline] = useState();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    setTimeline(TWEETS);
    setUserProfile(TEMP_PROFILE);
  }, []);


  const handleTweetSubmit = useCallback((submittedTweet) => {
    let tweet = {
      ...userProfile,
      content: submittedTweet,
      replyCount: 0,
      retweets: 0,
      likes: 0
    };
    setTimeline((prev) => [tweet, ...prev])
  }, []);
  
  return [timeline, handleTweetSubmit, userProfile];
})
