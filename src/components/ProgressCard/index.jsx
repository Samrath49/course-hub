import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import { Checkbox, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import { Button } from "@material-tailwind/react";
import {
  enrollInCourse,
  unenrollFromCourse,
} from "../../redux/reducers/enrolledCoursesSlice";
import {
  enrollUserInCourse,
  getRandomNumber,
  unenrollUserFromCourse,
} from "../../utils/functions";
import { ref, set } from "firebase/database";
import { db } from "../../firebase.config";

const ProgressCard = ({ course }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    name,
    id,
    link,
    thumbnail,
    description,
    instructor,
    tags,
    duration,
    location,
    schedule,
    students,
  } = course;

  const studentArray = Object.values(students);
  let progress = null;
  const isUserEnrolled = studentArray.some((student) => {
    if (student?.email === user?.email) {
      progress = student?.progress;
      // console.log(student);
      return true;
    }
    return false;
  });

  const handleUnenroll = () => {
    const courseId = id;

    unenrollUserFromCourse(courseId, user);
    dispatch(unenrollFromCourse(courseId));
  };

  const handleCourseComplete = async (checked) => {
    const courseId = id;

    if (checked && Number(progress) < 100) {
      const updateProgress = String(100);
      const databaseRef = ref(
        db,
        `courses/${courseId}/students/${user.uid}/progress`
      );
      set(databaseRef, updateProgress);

      setIsCompleted(true);
    } else {
      const databaseRef = ref(
        db,
        `courses/${courseId}/students/${user.uid}/progress`
      );
      set(databaseRef, String(0));

      setIsCompleted(false);
    }
  };

  return (
    <>
      <div
        className="wow fadeInUp hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 dark:bg-dark"
        data-wow-delay=".1s"
      >
        <Link
          to={`/courses/${link}`}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {tags[0]}
          </span>
          <img
            src={`/images/course/${getRandomNumber()}.jpg`}
            alt="thumbnail"
            className="w-full"
          />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              to={`/courses/${link}`}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {name}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {description}
          </p>
          <div className="flex items-center mb-5">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <img
                    src={`/images/instructor/${getRandomNumber()}.png`}
                    className="w-full"
                    alt="instructor"
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {instructor}
                </h4>
                <p className="text-xs text-body-color">
                  Professional Instructor
                </p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Course Duration
              </h4>
              <p className="text-xs text-body-color">{duration}</p>
            </div>
          </div>

          <div className="mb-6 border-b border-t border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            <div className="px-7 mt-6">
              <ProgressBar value={Number(progress)} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mr-5 flex items-center justify-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  Course Availability
                </h4>
                <p className="text-xs text-body-color">{location}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Schedule
              </h4>
              <p className="text-xs text-body-color">{schedule}</p>
            </div>
          </div>
          <div className="pt-5 px-5 w-full flex justify-between">
            <Checkbox
              onChange={(e) => handleCourseComplete(e.target.checked)}
              color="blue"
              value={isCompleted}
              id="ripple-on"
              label={
                <Typography className="flex font-medium text-blue-gray-300">
                  Mark as complete.
                </Typography>
              }
              className="bg-blue-gray-300"
              ripple={true}
            />
            <Button onClick={handleUnenroll} className="bg-red-500" size="sm">
              Leave Course
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressCard;
