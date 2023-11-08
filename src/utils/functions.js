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

export const enrollUserInCourse = async (courseId, user) => {
  const courseRef = ref(db, `courses/${courseId}/students/${user?.uid}`);
  // Set the user's enrollment status
  const newStudent = {
    id: user?.uid,
    name: user?.displayName,
    email: user?.email,
    progress: "0",
    completed: "false"
  }

  update(courseRef, newStudent);
  return true;
}

export const unenrollUserFromCourse = (courseId, user) => {
  const courseRef = ref(db, `courses/${courseId}/students/${user?.uid}`);

  // Remove the student's data from the course
  remove(courseRef).then(() => {
    console.log(`User with ID ${user?.id} has been unenrolled from the course with ID ${courseId}`);
  }).catch((error) => {
    console.error(`Error unenrolling user from the course: ${error}`);
  });
}