export const BEARER_TEXT = "Bearer";
export const DB_NAME = "dadhich_bus";

/**
 * syn with env variable time for acess token and refesh token
 */
export const REFRESH_TOKEN_EXPIRY_UTIL = 30 * 24 * 60 * 60 * 1000;
export const ACCESS_TOKEN_EXPIRY_UTIL = 15 * 60 * 1000;

export const defaultWebsiteData = {
  contactEmail: ["skworrier@gmail.com"],
  rentalEmail: ["skworrier@gmail.com"],
  inqueryEmail: ["skworrier@gmail.com"],
  phone: "+919511547154",
  supportEmail: "",
  brandname: "",
  contactAddress: {
    address1: "",
    city: "",
    State: "",
    Pincode: "",
  },
  host: ["localhost:3000"],
};
