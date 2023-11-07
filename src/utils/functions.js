import { fetchCoursesSuccess, fetchCoursesFailure } from '../redux/reducers/coursesSlice';
import { ref, onValue } from 'firebase/database';
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