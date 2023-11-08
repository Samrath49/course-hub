import { fetchCoursesSuccess, fetchCoursesFailure } from '../redux/reducers/coursesSlice';
import { ref, onValue, update, remove } from 'firebase/database';
import { db } from "../firebase.config";

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      const coursesRef = ref(db, 'courses');

      onValue(coursesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const coursesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(fetchCoursesSuccess(coursesArray));
        } else {
          dispatch(fetchCoursesSuccess([]));
        }
      });
    } catch (error) {
      dispatch(fetchCoursesFailure(error));
    }
  };
};

export const enrollUserInCourse = (courseId, userId) => {
  const courseRef = ref(db, `courses/${courseId}/students/${userId}`);
  // Set the user's enrollment status
  update(courseRef, {
    name: "User Name",
    progress: "0",
    completed: "false"
  });
}

export const unenrollUserFromCourse = (courseId, userId) => {
  const courseRef = ref(db, `courses/${courseId}/students/${userId}`);
  // Remove the user from the course's students
  remove(courseRef);
}