import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Loader, Footer } from "./components";

const Course = React.lazy(() => import("./pages/Course"));
const Courses = React.lazy(() => import("./pages/Courses"));
const User = React.lazy(() => import("./pages/User"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <div className="bg-black ${inter.className}">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Courses />
              </Suspense>
            }
          />
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Courses />
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
            path="/course"
            element={
              <Suspense fallback={<Loader />}>
                <Course />
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
