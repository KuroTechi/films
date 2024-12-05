import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPageRouter } from "./ErrorPageRouter";
import { MovieDetailsPage } from "./components/details/movie-details-page";
import { Provider } from "react-redux";
import store from "./store/index";
import { ProfilePage } from "./components/profile/profile-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPageRouter />,
    children: [],
  },
  {
    path: "details/:movieId",
    element: <MovieDetailsPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
