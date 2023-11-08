import { createSlice } from "@reduxjs/toolkit";

const loadEnrolledCoursesFromLocalStorage = () => {
  const coursesData = localStorage.getItem("enrolledCourses");
  return coursesData ? JSON.parse(coursesData) : [];
};

const saveEnrolledCoursesToLocalStorage = (courses) => {
  localStorage.setItem("enrolledCourses", JSON.stringify(courses));
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState: loadEnrolledCoursesFromLocalStorage(),
  reducers: {
    enrollInCourse: (state, action) => {
      const course = action.payload.course;
      const user = action.payload.user;
     /*  const newStudent = {
        id: user?.uid,
        name: user?.displayName,
        email: user?.email,
        progress: "0",
        completed: "false",
      }; */
    
      /* const updatedCourse = {
        ...course,
        students: [...course.students, newStudent],
      };
    
      const updatedState = [...state, updatedCourse];
    
      state.length = 0; */
      // state.push(...updatedState);
      state.push(course);
      saveEnrolledCoursesToLocalStorage(state);
    },
    unenrollFromCourse: (state, action) => {
      const courseId = action.payload;
      const updatedCourses = state.filter((course) => course.id !== courseId);
      state.length = 0;
      state.push(...updatedCourses);
      saveEnrolledCoursesToLocalStorage(state);
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } =
  enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;
