import jwt from "jsonwebtoken";
import { Otp } from "../models/otp.model.js";
import { makeString } from "../utils/common.js";
import { createError } from "../utils/error.js";

export const validateOtp = async (req, _, next) => {
  const { otp, username } = req.body;
  const token = req.cookies["hash-id"];
  const currentDate = new Date();

  if (!token) {
    console.log("validateOtp: Token is missing or invalid");
    return next(createError(401, "Timeout, please resend OTP"));
  }

  const jwtOptions = {
    algorithms: ["HS256"],
    issuer: "DADHICH BUS",
  };

  try {
    // Verify the token
    const jwtData = jwt.verify(token, process.env.SECRET_OTP_KEY, jwtOptions);
    const { otpid } = jwtData;

    // Retrieve OTP data
    const otpData = await Otp.getOtpById(otpid);
    if (!otpData) {
      console.log("validateOtp: OTP data not found for provided ID");
      return next(createError(404, "OTP data not found"));
    }

    const { expiryDate } = otpData;

    // Check for OTP mismatch
    if (makeString(otp) !== makeString(otpData.otp)) {
      console.log("validateOtp: OTP mismatch");
      return next(createError(400, "Invalid OTP, please try again."));
    }

    // Check if OTP has expired
    if (currentDate.getTime() > new Date(expiryDate).getTime()) {
      console.log("validateOtp: OTP has expired");
      return next(
        createError(440, "OTP has expired, please request a new one.")
      );
    }

    // Attach user ID to the request for further processing
    if (
      otpData?.userId?.email == username ||
      otpData?.userId?.username == username
    ) {
      req.user = otpData.userId;
      next();
    } else {
      console.log("validateOtp: invalid username provided");
      return next(createError(400, "Invalid username"));
    }
  } catch (error) {
    console.error(
      "validateOtp: Error during JWT verification or OTP validation",
      error
    );
    if (error.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid token, please log in again."));
    }
    if (error.name === "TokenExpiredError") {
      return next(
        createError(440, "OTP session expired, please request a new OTP.")
      );
    }
    return next(
      createError(500, "An unexpected error occurred during OTP validation.")
    );
  }
};
