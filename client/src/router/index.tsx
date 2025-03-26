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
import { AdminDashboard, AdminSettings } from "../pages/admin";
import { AddBasicTourDetails } from "../components/Admin/tours";
import Test from "../pages/Test";
import TourListPage from "../components/Admin/tours/TourListPage";
import PlacesAdminPage from "../pages/admin/PlacesAdminPage";
import TermsAdminPage from "../pages/admin/TermsAdminPage";
import FAQsAdminPage from "../pages/admin/FAQsAdminPage";
import BusAdminPage from "../pages/admin/BusAdminPage";
import AdminUserList from "../pages/admin/AdminUserList";
import { TourGuide } from "../pages/TourGuide";
import AboutUs from "../pages/AboutUs";

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
        path: PublicRoutes.ABOUT_US,
        element: <AboutUs />,
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
      { path: "/test", element: <Test /> },
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
        path: PublicRoutes.TOUR_GUIDES,
        children: [
          {
            index: true,
            element: <TourGuide />,
          },
          {
            path: ":id",
            element: <>ANCD</>,
          },
        ],
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
            element: <AdminDashboard />,
          },
          {
            path: AdminRoutes.DASHBOARD,
            element: <AdminDashboard />,
          },
          {
            path: AdminRoutes.SETTING,
            element: <AdminSettings />,
          },
          {
            path: AdminRoutes.LOCATIONS,
            element: <PlacesAdminPage />,
          },
          {
            path: AdminRoutes.TERMS,
            element: <TermsAdminPage />,
          },
          {
            path: AdminRoutes.FAQs,
            element: <FAQsAdminPage />,
          },
          {
            path: AdminRoutes.BUS,
            element: <BusAdminPage />,
          },
          {
            path: AdminRoutes.TOURS,
            children: [
              {
                path: AdminRoutes.ADD_TOUR,
                element: <AddBasicTourDetails />,
              },
              {
                index: true,
                element: <TourListPage />,
              },
            ],
          },
          {
            path: AdminRoutes.USER,
            children: [
              {
                path: AdminRoutes.ADD_TOUR,
                element: <AddBasicTourDetails />,
              },
              {
                index: true,
                element: <AdminUserList />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
