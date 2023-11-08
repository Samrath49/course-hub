import { createSlice } from '@reduxjs/toolkit';

const enrolledCoursesSlice = createSlice({
  name: 'enrolledCourses',
  initialState: [],
  reducers: {
    enrollInCourse: (state, action) => {
      state.push(action.payload);
    },
    unenrollFromCourse: (state, action) => {
      const courseId = action.payload;
      return state.filter(course => course.id !== courseId);
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;