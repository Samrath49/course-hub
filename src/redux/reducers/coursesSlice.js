import { createSlice } from "@reduxjs/toolkit";
import { FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE } from '../actions/actions';

const coursesSlice  = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        error: null,
      },
    reducers: {
        fetchCoursesSuccess: (state, action) => {
            state.courses = action.payload;
            state.error = null;
          },
        fetchCoursesFailure: (state, action) => {
            state.courses = [];
            state.error = action.payload;
          },
    }
});

export const { fetchCoursesSuccess, fetchCoursesFailure } = coursesSlice.actions;
export default coursesSlice.reducer;