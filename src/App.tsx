import Wrapper from "./components/Wrapper";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import React from "react";
import Loading from "./components/Loading";

const Landing = React.lazy(() => import("./containers/landing"));
const Login = React.lazy(() => import("./containers/login"));
const Events = React.lazy(() => import("./containers/events"));
const Event = React.lazy(() => import("./containers/event"));

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<Loading />}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path="/landing"
          element={
            <React.Suspense fallback={<Loading />}>
              <Landing />
            </React.Suspense>
          }
        />
        <Route
          path="/events"
          element={
            <React.Suspense fallback={<Loading />}>
              <Events />
            </React.Suspense>
          }
        />
        <Route
          path="/events/:id"
          element={
            <React.Suspense fallback={<Loading />}>
              <Event />
            </React.Suspense>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
