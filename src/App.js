import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "../components/Error";
import Contact from "../components/Contact";
import RestaurantMenu from "../components/RestaurantMenu";
import Profile from "../components/Profile";
import Shimmar from "../components/Shimmar";
import { UserContext } from "../utils.js/UserContext";
import { Provider } from "react-redux";
import store from "../utils.js/store";
import { Star } from "../components/Star";


const About = lazy(() => import("../components/About"));
const InstaMart = lazy(() => import("../components/InstaMart"));

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "namaste React",
    email: "support@gmail.com",
  });
  return (
    <div>
      <Provider store={store}>
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,
          }}
        >
          <Header />
          <Outlet />
          <Footer />
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Body user={{ name: "namaste React", email: "support@gmail.com" }} />
        ),
      },
      {
        path: "/About",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About name={"Akhilesh"} />
          </Suspense>
        ),
        errorElement: <Error />,
        children: [
          {
            path: "Profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmar />}>
            <InstaMart />
          </Suspense>
        ),
       
      },
      {
        path:"/star",
        element: <Star/>
      }
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
// root.render(<HeaderComponent/>)

//HW
// install Babel plugin-transform-remove-console
//BrowserList --> it tells old verson to support browser
