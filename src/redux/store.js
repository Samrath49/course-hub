import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./reducers/coursesSlice";
import searchReducer  from "./reducers/searchSlice";

const store = configureStore({reducer: {courses: coursesReducer, search: searchReducer}});

export default store;