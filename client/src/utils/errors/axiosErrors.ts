import axios, { AxiosError } from "axios";
import { errorPopup } from "./alerts";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const axiosErrorHandling = async (errorCode: number) => {
  if (errorCode === 400) {
    /*Bad request */
    return "Invalid request";
  } else if ([413, 401].includes(errorCode)) {
    /*Unauthorized request */
    return "Access denied";
  } else if (errorCode === 404) {
    /*Not found exception*/
    return "The requested information could not be found";
  } else if (errorCode === 409) {
    /*conflict expection */
    return "Conflict occurred";
  } else if ([500, 503, 502, 504].includes(errorCode)) {
    /*Internal server error */
    return "Service under maintainance! Please try after some time.";
  } else {
    return "The connection has timed out, please try again.";
  }
};

export const otherErrors = async (
  error: Error & { errorCode?: number; errorMessage?: string }
) => {
  const errorCode = error?.errorCode;
  if (errorCode && [102, 105, 108].includes(errorCode)) {
    /* Session expired */
    errorPopup(error?.errorMessage ?? "");
    setTimeout(async () => {
      //const url = `${window?.location?.origin}/#/login`;
      //await deleteDatabase(USER_STORAGE);
      //window.location.replace(url);
    }, 1000);
  } else if (errorCode) {
    errorPopup(error?.errorMessage ?? "");
  } else {
    errorPopup(error?.message || error?.errorMessage || "");
  }
};

export const handleError = async (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      /*API Error Detected */
      if (error?.response?.status) {
        const message = await axiosErrorHandling(error?.response?.status);
        errorPopup(message);
      } else {
        Swal.fire(
          "Server Error",
          "The server is currently unavailable. Please try again later.",
          "error"
        );
      }
    } else {
      /*Network Error */
      errorPopup(error?.message);
    }
  } else {
    /*Javascript Error */
    await otherErrors(error);
  }
};
