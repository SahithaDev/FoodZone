import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Heading from "./components/Heading.js";
import Body from "./components/Body.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu.js";

const AppLayout = () => {
  return (
    <div className="app">
      <Heading />
      <Outlet />
    </div>
  );
};
const Grocery = lazy(() => import("./components/Grocery.js"));
const AppRouter = createBrowserRouter([
  //creating configuration
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        path: "/home",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />);
