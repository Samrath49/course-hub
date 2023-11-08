import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/reducers/userSlice";
import { ProgressCard } from "../components";

const Profile = () => {
  const user = useSelector(selectUser);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const courses = useSelector((state) => state.courses.courses);
  const filterCoursesByUserId = (courses, id) => {
    return courses.filter(
      (course) =>
        course.students &&
        Object.values(course.students).some((student) => student.id === id)
    );
  };

  useEffect(() => {
    if (user && courses) {
      const enrolled = filterCoursesByUserId(courses, user.uid);
      setEnrolledCourses(enrolled);
    } else {
      setEnrolledCourses([]);
    }
  }, [user, courses]);

  return (
    <>
      <section className="relative z-10 pb-[120px] pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Hi 👋 {user?.displayName}
                </h2>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      <div className="mr-4">
                        <p className="mb-2 text-xl font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed xl:text-xl xl:leading-relaxed">
                          Check out your profile to keep tract of all our
                          courses and their progress. Make sure to complete all
                          of your courses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 flex flex-col gap-5">
                  {enrolledCourses &&
                    enrolledCourses.map((course, index) => (
                      <div
                        key={index}
                        className="flex justify-center align-middle gap-2"
                      >
                        <ProgressCard course={course} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/src/assets/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
