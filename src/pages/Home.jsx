import React from "react";
import { Hero, SingleCard, PageHeader } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const courses = useSelector((state) => state.courses.courses);
  const coursesToDisplay = courses.slice(0, 3);

  return (
    <div>
      <Hero />
      <div>
        <PageHeader
          title={"Our Top Courses"}
          description={
            "Our best courses that can help you improve your skills."
          }
          isPage={false}
          enableSearch={false}
        />
      </div>

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {coursesToDisplay.map((course) => (
              <div
                key={course.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
