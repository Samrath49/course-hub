import { createSlice } from "@reduxjs/toolkit";

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