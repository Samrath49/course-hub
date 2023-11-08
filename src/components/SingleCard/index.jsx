import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/reducers/userSlice";
import {
  enrollUserInCourse,
  fetchCourses,
  getRandomNumber,
  unenrollUserFromCourse,
} from "../../utils/functions";
import {
  enrollInCourse,
  unenrollFromCourse,
} from "../../redux/reducers/enrolledCoursesSlice";
import { Button } from "@material-tailwind/react";

const SingleCard = ({ course }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
  const isUserEnrolled = studentArray.some((student) => {
    if (student?.email === user?.email) {
      return true;
    }
    return false;
  });

  const handleEnroll = async () => {
    if (isUserEnrolled) {
      return;
    }

    const courseId = id;
    await enrollUserInCourse(courseId, user);

    dispatch(fetchCourses());
    dispatch(enrollInCourse({ course, user }));
  };

  const handleUnenroll = () => {
    const courseId = id;
    unenrollUserFromCourse(courseId, user);
    dispatch(unenrollFromCourse(courseId));
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
          <div className="flex items-center">
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
          {isUserEnrolled ? (
            <>
              <Button
                onClick={handleUnenroll}
                className="bg-red-500 mt-5"
                size="sm"
              >
                Leave Course
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <Button
                onClick={handleEnroll}
                className="bg-[#4A6CF7] mt-5"
                size="sm"
              >
                Enroll
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleCard;
