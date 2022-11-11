import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import MainLayout from "../layouts/main";
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from "../config";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "login-unprotected", element: <Login /> },
        { path: "register-unprotected", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify", element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "ecommerce", element: <GeneralEcommerce /> },
        { path: "analytics", element: <GeneralAnalytics /> },
        { path: "banking", element: <GeneralBanking /> },
        { path: "crypots", element: <Crypots /> },
        { path: "crypots/:id", element: <CrypotsInfo /> },
        { path: "swap", element: <Swap /> },
        { path: "tracker", element: <Tracker /> },
        { path: "tracker/:id", element: <CoinInfo /> },
        { path: "tax", element: <ComingSoon /> },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "pricing", element: <Pricing /> },
        { path: "payment", element: <Payment /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: "about-us", element: <About /> },
        { path: "roadmap", element: <RoadMap /> },
        { path: "contact-us", element: <Contact /> },
        { path: "faqs", element: <Faqs /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPassword = Loadable(lazy(() => import("../pages/auth/ResetPassword")));
const VerifyCode = Loadable(lazy(() => import("../pages/auth/VerifyCode")));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import("../pages/dashboard/GeneralApp")));
const GeneralEcommerce = Loadable(lazy(() => import("../pages/dashboard/GeneralEcommerce")));
const GeneralAnalytics = Loadable(lazy(() => import("../pages/dashboard/GeneralAnalytics")));
const GeneralBanking = Loadable(lazy(() => import("../pages/dashboard/GeneralBanking")));
const GeneralBooking = Loadable(lazy(() => import("../pages/dashboard/GeneralBooking")));
const Crypots = Loadable(lazy(() => import("../pages/dashboard/Crypots")));
const CrypotsInfo = Loadable(lazy(() => import("../pages/dashboard/CrypotsInfo")));
const Swap = Loadable(lazy(() => import("../pages/dashboard/Swap")));
const Tracker = Loadable(lazy(() => import("../pages/dashboard/Tracker")));
const CoinInfo = Loadable(lazy(() => import("../pages/dashboard/CoinInfo")));

// MAIN
const HomePage = Loadable(lazy(() => import("../pages/Home")));
const About = Loadable(lazy(() => import("../pages/About")));
const RoadMap = Loadable(lazy(() => import("../pages/RoadMap")));
const Contact = Loadable(lazy(() => import("../pages/Contact")));
const Faqs = Loadable(lazy(() => import("../pages/Faqs")));
const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Pricing = Loadable(lazy(() => import("../pages/Pricing")));
const Payment = Loadable(lazy(() => import("../pages/Payment")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
