import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./reducers/coursesSlice";
import searchReducer from "./reducers/searchSlice";
import userReducer from "./reducers/userSlice";
import enrolledCoursesReducer from "./reducers/enrolledCoursesSlice";
import updateLikesReducer  from './reducers/likeSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    search: searchReducer,
    user: userReducer,
    enrolledCourses: enrolledCoursesReducer,
    likes: updateLikesReducer, 
  },
});

export default store;
