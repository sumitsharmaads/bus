import { PublicRoutes } from "../navigation";

export const RENTAL_SERVICE = "RENTAL SERVICES";
export const SIGN_UP = "SIGN UP";
export const INQUERY_NOW = "INQUERY NOW";
export const TOUR_GUIDE = "TOUR GUIDES";

export const routeOptions = {
  HOME: PublicRoutes.HOME,
  ABOUT: PublicRoutes.ABOUT_US,
  CONTACT: PublicRoutes.CONTACT,
  [RENTAL_SERVICE]: PublicRoutes.SERVICES,
  LOGIN: PublicRoutes.LOGIN,
  [SIGN_UP]: PublicRoutes.SIGNUP,
  [INQUERY_NOW]: PublicRoutes.INQUERY_NOW,
  [TOUR_GUIDE]: PublicRoutes.TOUR_GUIDES,
};
