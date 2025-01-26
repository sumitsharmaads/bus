import { Navigate, createHashRouter } from "react-router-dom";
import { PublicRoutes, AdminRoutes } from "../navigation";
import { NotFound } from "../components";
import { AdminLayout, PublicLayout } from "../layouts";
import Contact from "../pages/Contact";
import { Signup } from "../pages/Signup";
import { SignIn } from "../pages/Signin";
import ForgotPassword from "../pages/ForgotPassword";
import Inquiry from "../pages/Inquery";
import Services from "../pages/Servies";
import Profile from "../pages/Profile";
import {
  AdminProtectedRoute,
  PreventLoginRoute,
  PrivateRoute,
} from "../components/auth";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { Home } from "../pages/Home";
import { AdminSettings } from "../pages/admin";
import { AddBasicTourDetails } from "../components/Admin/tours";

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <PublicLayout />
      </AuthContextProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PublicRoutes.HOME,
        element: <Home />,
      },
      {
        path: PublicRoutes.SIGNUP,
        element: <PreventLoginRoute element={<Signup />} />,
      },
      {
        path: PublicRoutes.LOGIN,
        element: <PreventLoginRoute element={<SignIn />} />,
      },
      {
        path: PublicRoutes.FORGOT_PASSWORD,
        element: <PreventLoginRoute element={<ForgotPassword />} />,
      },
      { path: PublicRoutes.QUICK_INQUERY, element: <Inquiry /> },
      { path: PublicRoutes.SERVICES, element: <Services /> },
      {
        path: PublicRoutes.PROFILE,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: PublicRoutes.CONTACT,
        element: <Contact />,
      },
      {
        path: "/admin",
        element: (
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminSettings />,
          },
          {
            path: AdminRoutes.SETTING,
            element: <AdminSettings />,
          },
          {
            path: AdminRoutes.TOURS,
            children: [
              {
                path: AdminRoutes.ADD_TOUR,
                element: <AddBasicTourDetails />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
