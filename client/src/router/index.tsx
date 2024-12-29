import { Navigate, createHashRouter } from "react-router-dom";
import { Outlet } from "react-router";
import { PublicRoutes, AdminRoutes } from "../navigation";
import { NotFound } from "../components";
import { PublicLayout } from "../layouts";
import Contact from "../pages/Contact";
import { Signup } from "../pages/Signup";
import { SignIn } from "../pages/Signin";
import ForgotPassword from "../pages/ForgotPassword";
import Inquiry from "../pages/Inquery";
import Services from "../pages/Servies";

export const router = createHashRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <>Hello</>,
      },
      { path: PublicRoutes.SIGNUP, element: <Signup /> },
      { path: PublicRoutes.LOGIN, element: <SignIn /> },
      { path: PublicRoutes.FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: PublicRoutes.QUICK_INQUERY, element: <Inquiry /> },
      { path: PublicRoutes.SERVICES, element: <Services /> },
      {
        path: PublicRoutes.CONTACT,
        element: <Contact />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
