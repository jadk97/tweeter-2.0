import React, { useState } from "react";
import Header from "./Header";
import TweetList from "../components/TweetList";
import _ from "lodash";
import { useParams, useLocation, useRouteMatch, useHistory, Switch, Route } from "react-router-dom";
import { selectUserProfile, followUser, unfollowUser } from "../reducers/userProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import HorizontalNavBar from "./HorizontalNavBar";
import Button from "../components/Button";
import "./Profile.css";
import findKeys from "../helpers/findKeys";
const Profile = (props) => {
  let { creatorHandle } = useParams();
  let location = useLocation();

  
  let match = useRouteMatch();
  
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  let isFollowed = userProfile.following.filter((user) => user.creatorHandle === creatorHandle).length > 0;
  console.log(isFollowed);
  let followsYou = !!userProfile.followers.find((user) => user.creatorHandle === creatorHandle);
  console.log("followsYou", followsYou);
  // const [follow, setFollow] = useState(isFollowed);
  const [hover, setHover] = useState(false);
  let userList = [
    {
      creatorName: "Ayn Rand",
      creatorHandle: "AtlasShrugged",
      avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
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
        replies: []
      }],
      tweets: [{
        id: "tweet1",
        type: "parent",
        content: "What tweeterific tweet",
        posted_at: Date.now(),
        creatorName: "Ayn Rand",
        creatorHandle: "AtlasShrugged",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
        replyCount: 1,
        retweets: 5,
        likes: 120,
        mentions: [],
        retweetedBy: [],
        replies: [{
          id: "tweet3",
          type: "child",
          content: "Oranges.",
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
        replies: []
      },
      {
        id: "tweet3",
        type: "child",
        content: "Oranges.",
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
        replyingTo: ["tweet1"]
      }
      ]
    },
    {
      creatorName: "Ernest Hemingway",
      creatorHandle: "EHemWay",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
      bio: "I wrote For Whom the Bell Tolls",
      joined: Date.now(),
      website: null,
      location: "Oak Park, Illinois, U.S.",
      likedTweets: [],
      tweets: [{
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
        replies: [],
        replyingTo: []
      },
      {
        id: "tweet5",
        type: "parent",
        content: "But also pineapples.",
        posted_at: Date.now(),
        creatorName: "ErnestHemingway",
        creatorHandle: "EHemWay",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg",
        replyCount: 1,
        retweets: 500,
        likes: 2,
        mentions: [],
        retweetedBy: [],
        replies: [{
          id: "tweet6",
          type: "child",
          content: "Oranges.",
          posted_at: Date.now(),
          creatorName: "Ayn Rand",
          creatorHandle: "AtlasShrugged",
          avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Ayn_Rand_by_Talbot_1943.jpg/220px-Ayn_Rand_by_Talbot_1943.jpg",
          replyCount: 0,
          retweets: 500,
          likes: 2,
          mentions: ["EHemWay"],
          retweetedBy: [],
          replies: [],
          replyingTo: ["tweet5"]
        }],
        replyingTo: []
      }]
    }
  ];
  let renderedUser;
  if (creatorHandle === userProfile.creatorHandle) {
    renderedUser = [userProfile];

  }
  else {
    renderedUser = userList.filter((user) => user.creatorHandle === creatorHandle);
  }

  let tweets;
  let viewMode = location.pathname.split("/");
  if (viewMode[viewMode.length - 1] === "with_replies") {
    tweets = renderedUser[0].tweets;
    // tweets = new Set();
    // tweets.add(renderedUser[0].tweets);
    // tweets.add(renderedUser[0].retweetedTweets);

  }
  else if (viewMode[viewMode.length - 1] === "likes") {
    tweets = renderedUser[0].likedTweets;
  }
  else {
    tweets = renderedUser[0].tweets.filter((tweet) => tweet.type === "parent" || (tweet.type === "child" && tweet.retweetedBy.includes(userProfile.creatorHandle)));

  }
  // let tweets = renderedUser[0].tweets;

  // console.log("this is the current url", location);
  let tweetCount = findKeys(renderedUser[0].tweets, "id").length;

  const followHandler = () => {
    if(!isFollowed){
      dispatch(followUser(renderedUser[0]));
      // setFollow(true)
    }
    else{
      dispatch(unfollowUser(renderedUser[0]));
    }
  }

  const toggleHover = () => {
    setHover((prev) => !prev);
  }

  return (
    <div className="center-view">
      <Header title={renderedUser[0].creatorName} subtitle={tweetCount + " Tweets"} navButton={true} />
      <div className="profile-images">
        <img className="profile-avatar" src={renderedUser[0].avatar} />
        <img className="profile-banner" src={"https://gethope.net/wp-content/uploads/2019/07/Why-How-and-What-Slider-Background-1500x500.jpg"} />
      </div>
      <div className="profile-header">
        <div className="profile-interactables">
          <div>
          {creatorHandle !== userProfile.creatorHandle ?
            (
              <Button onClick={followHandler} 
              danger={isFollowed && hover} 
              onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
              {isFollowed ? ( hover ? "Unfollow" : "Following") : "Follow" } 
              </Button>
            )
            :
            (
              <Button>
                Edit Profile
              </Button>
            )
          }
          </div>
        </div>
        <div className="profile-text-content">
          <div className="creator-name">
            {renderedUser[0].creatorName}
          </div>
          <div className="creator-handle">
            {"@" + renderedUser[0].creatorHandle}
            {followsYou && <span className="profile-follows-you">Follows you</span> }
            
          </div>
          <div className="bio">
            {renderedUser[0].bio}
          </div>
          <div className="profile-details">
            {renderedUser[0].location && (
              <div className="profile-location">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="profile-icon"
                  size="lg"
                />
                {renderedUser[0].location}
              </div>
            )}
            {renderedUser[0].website && (
              <div className="profile-website">
                <FontAwesomeIcon
                  icon={faLink}
                  className="profile-icon"
                  size="lg"
                />
                {renderedUser[0].website}
              </div>
            )}
            {renderedUser[0].joined && (
              <div className="profile-date-joined">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  color="#778899"
                  size="lg"
                  className="profile-icon"
                />
                  Joined: {new Date(renderedUser[0].joined).toLocaleString("default", { month: "long", year: "numeric" })}
              </div>
            )}

          </div>
        </div>
      </div>
      <HorizontalNavBar headings={[{ title: "Tweets", path: `${match.url}` }, { title: "Tweets & Replies", path: `${match.url}/with_replies` }, { title: "Likes", path: `${match.url}/likes` }]} />
      <TweetList timeline={tweets} />

    </div>
  )
}

export default Profile;