import { lazy, Suspense } from "react";
import { Navigate, createHashRouter } from "react-router-dom";
import { PublicRoutes, AdminRoutes } from "../navigation";
import { AdminLayout, PublicLayout } from "../layouts";
import {
  AdminProtectedRoute,
  PreventLoginRoute,
  PrivateRoute,
} from "../components/auth";
import { AuthContextProvider } from "../contexts/AuthContextProvider";
import { NotFound } from "../components";
import DummyFallback from "../components/DummyFallback";
import { setLoader } from "./loaders/setLoader";
import { TourTravelProvider } from "../contexts/TourTravelProvider";
import TourStepper from "../components/Admin/tours/TourStepper";
import AdminUserForm from "../pages/admin/AdminUserForm";

// Lazy-loaded pages
const Contact = lazy(() => import("../pages/Contact"));
const Signup = lazy(() => import("../pages/Signup"));
const SignIn = lazy(() => import("../pages/Signin"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Inquiry = lazy(() => import("../pages/Inquery"));
const Services = lazy(() => import("../pages/Servies"));
const Profile = lazy(() => import("../pages/Profile"));
const Home = lazy(() => import("../pages/Home"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminSettings = lazy(() => import("../pages/admin/Setttings"));
const AddBasicTourDetails = lazy(
  () => import("../components/Admin/tours/AddBasicTourDetails")
);
const Test = lazy(() => import("../pages/Test"));
const TourListPage = lazy(
  () => import("../components/Admin/tours/TourListPage")
);
const PlacesAdminPage = lazy(() => import("../pages/admin/PlacesAdminPage"));
const TermsAdminPage = lazy(() => import("../pages/admin/TermsAdminPage"));
const FAQsAdminPage = lazy(() => import("../pages/admin/FAQsAdminPage"));
const BusAdminPage = lazy(() => import("../pages/admin/BusAdminPage"));
const AdminUserList = lazy(() => import("../pages/admin/AdminUserList"));
const TourGuide = lazy(() => import("../pages/TourGuide"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const SEOAdminPage = lazy(() => import("../pages/admin/AdminSEODetailsList"));
const AddSEO = lazy(() => import("../pages/admin/AddSeoDetails"));

// Error boundary for routing
const ErrorElement = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-red-100 text-red-600">
    <h2 className="text-lg font-bold">
      Something went wrong while loading this page.
    </h2>
  </div>
);

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Suspense fallback={<DummyFallback />}>
          <PublicLayout />
        </Suspense>
      </AuthContextProvider>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        loader: setLoader,
        element: (
          <Suspense fallback={<DummyFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: PublicRoutes.HOME,
        loader: setLoader,
        element: (
          <Suspense fallback={<DummyFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: PublicRoutes.ABOUT_US,
        loader: setLoader,
        element: (
          <Suspense fallback={<DummyFallback />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: PublicRoutes.SIGNUP,
        loader: setLoader,
        element: (
          <PreventLoginRoute
            element={
              <Suspense fallback={<DummyFallback />}>
                <Signup />
              </Suspense>
            }
          />
        ),
      },
      {
        path: PublicRoutes.LOGIN,
        loader: setLoader,
        element: (
          <PreventLoginRoute
            element={
              <Suspense fallback={<DummyFallback />}>
                <SignIn />
              </Suspense>
            }
          />
        ),
      },
      {
        path: PublicRoutes.FORGOT_PASSWORD,
        element: (
          <PreventLoginRoute
            element={
              <Suspense fallback={<DummyFallback />}>
                <ForgotPassword />
              </Suspense>
            }
          />
        ),
      },
      {
        path: PublicRoutes.QUICK_INQUERY,
        loader: setLoader,
        element: (
          <Suspense fallback={<DummyFallback />}>
            <Inquiry />
          </Suspense>
        ),
      },
      {
        path: PublicRoutes.SERVICES,
        loader: setLoader,
        element: (
          <Suspense fallback={<DummyFallback />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "/test",
        element: (
          <Suspense fallback={<DummyFallback />}>
            <Test />
          </Suspense>
        ),
      },
      {
        path: PublicRoutes.PROFILE,
        element: (
          <PrivateRoute>
            <Suspense fallback={<DummyFallback />}>
              <Profile />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: PublicRoutes.CONTACT,
        loader: setLoader,
        element: (
          <Suspense fallback={<DummyFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: PublicRoutes.TOUR_GUIDES,
        loader: setLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <TourGuide />
              </Suspense>
            ),
          },
          { path: ":id", element: <>ANCD</> },
        ],
      },
      {
        path: "/admin",
        element: (
          <AdminProtectedRoute>
            <Suspense fallback={<DummyFallback />}>
              <AdminLayout />
            </Suspense>
          </AdminProtectedRoute>
        ),
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.DASHBOARD,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.SETTING,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <AdminSettings />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.LOCATIONS,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <PlacesAdminPage />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.TERMS,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <TermsAdminPage />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.FAQs,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <FAQsAdminPage />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.BUS,
            element: (
              <Suspense fallback={<DummyFallback />}>
                <BusAdminPage />
              </Suspense>
            ),
          },
          {
            path: AdminRoutes.TOURS,
            children: [
              {
                path: AdminRoutes.ADD_TOUR,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <TourTravelProvider>
                      <TourStepper />
                    </TourTravelProvider>
                  </Suspense>
                ),
              },
              {
                path: AdminRoutes.EDIT_TOUR,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <TourTravelProvider>
                      <TourStepper />
                    </TourTravelProvider>
                  </Suspense>
                ),
              },
              {
                index: true,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <TourListPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: AdminRoutes.USER,
            children: [
              {
                path: AdminRoutes.ADD_TOUR,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <AdminUserForm />
                  </Suspense>
                ),
              },
              {
                path: AdminRoutes.USER_EDIT,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <AdminUserForm />
                  </Suspense>
                ),
              },
              {
                index: true,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <AdminUserList />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: AdminRoutes.SEO_LIST,
            children: [
              {
                path: AdminRoutes.ADD_SEO,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <AddSEO />
                  </Suspense>
                ),
              },
              {
                path: AdminRoutes.EDIT_SEO,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <AddSEO />
                  </Suspense>
                ),
              },
              {
                index: true,
                element: (
                  <Suspense fallback={<DummyFallback />}>
                    <SEOAdminPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
