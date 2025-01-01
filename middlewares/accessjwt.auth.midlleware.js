import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import { Token } from "../models/token.model.js";
import { makeString } from "../utils/common.js";

export const validateAccessToken = async (req, res, next) => {
  console.log("Middleware: Inside validateAccessToken");
  const authToken = req.get("Authorization");
  const accessToken = authToken?.split("Bearer ")[1];
  if (!accessToken) {
    console.log("not a valid acess token");
    return next(createError(401, "You are not authenticated!"));
  }
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (!refreshToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("uuid");
    console.log("not a valid refreshToken");
    return next(createError(401, "You are not authenticated!"));
  }

  const refreshTokenInDB = await Token.findByToken(refreshToken);

  if (!refreshTokenInDB) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("uuid");
    return next(createError(401, "You are not authenticated!"));
  }
  const user = refreshTokenInDB.userId;

  const _uuid = req.cookies["uuid"];

  // Options for JWT verification
  const options = {
    algorithms: ["HS256"],
    issuer: "DADHICH BUS",
    audience: _uuid,
  };

  try {
    // JWT verification
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      options
    );

    if (!decoded?.id) {
      console.log(
        "validateAccessToken: Invalid token format (missing user ID)"
      );
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("uuid");
      return next(createError(403, "Invalid token. Access forbidden."));
    }

    const isUuidValid = await bcrypt.compare(
      `${decoded.id.toString()}${process.env.UUID_KEY}`,
      _uuid
    );

    if (!isUuidValid) {
      console.log("validateAccessToken: UUID does not match");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("uuid");
      return next(createError(403, "Invalid token. Access forbidden."));
    }

    if (makeString(decoded?.id) !== makeString(user?._id)) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("uuid");
      return next(createError(403, "Invalid token. Access forbidden."));
    }
    req.user = {
      ...user,
      isAdmin: user.roleType === 0,
      isCaption: user.roleType === 2,
      isTempUser: user.roleType === 1,
    };

    console.log(
      "validateAccessToken: Token validation successful. User authenticated."
    );
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("validateAccessToken: Error during token validation", error);
    if (error.name === "TokenExpiredError") {
      console.log("validateAccessToken: Token has expired");
      return res.status(401).json({
        success: false,
        status: 5001,
        message: "retry",
        stack: error?.stack,
      });
    } else {
      console.log("validateAccessToken: Invalid token");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("uuid");
      return next(createError(403, "Invalid token. Access forbidden."));
    }
  }
};
