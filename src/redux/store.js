import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./reducers/coursesSlice";
import searchReducer  from "./reducers/searchSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({reducer: {courses: coursesReducer, search: searchReducer, user: userReducer}});

export default store;