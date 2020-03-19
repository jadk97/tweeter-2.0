import { configureStore } from "@reduxjs/toolkit";
import timelineReducer from "../reducers/timelineSlice";
import userProfileReducer from "../reducers/userProfileSlice";

export default configureStore({
  reducer: {
    timeline: timelineReducer,
    userProfile: userProfileReducer
  }
})