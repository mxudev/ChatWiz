import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "./components/login.js";
import Search from "./components/search.js";
import Thread from "./components/thread.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/thread/:thread_id",
    element: <Thread />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
