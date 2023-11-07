import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Loader, Footer } from "./components";
import { useDispatch } from "react-redux";
import { fetchCourses } from "./utils/functions";

const Home = React.lazy(() => import("./pages/Home"));
const Course = React.lazy(() => import("./pages/Course"));
const Courses = React.lazy(() => import("./pages/Courses"));
const User = React.lazy(() => import("./pages/User"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="bg-black ${inter.className}">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/user"
            element={
              <Suspense fallback={<Loader />}>
                <User />
              </Suspense>
            }
          />
          <Route
            path="/courses/:courseLink"
            element={
              <Suspense fallback={<Loader />}>
                <Course />
              </Suspense>
            }
          />
          <Route
            path="/courses"
            element={
              <Suspense fallback={<Loader />}>
                <Courses />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader full={true} />}>
                <ErrorPage />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
