import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Loader, Footer } from "./components";
import { useDispatch } from "react-redux";
import { fetchCourses } from "./utils/functions";
import { login, logout } from "./redux/reducers/userSlice";
import { auth, onAuthStateChanged } from "./firebase.config";

const Home = React.lazy(() => import("./pages/Home"));
const Course = React.lazy(() => import("./pages/Course"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

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
            path="/user-profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
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
            path="/signin"
            element={
              <Suspense fallback={<Loader />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loader />}>
                <SignUp />
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
