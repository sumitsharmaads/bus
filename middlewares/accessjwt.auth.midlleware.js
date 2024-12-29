import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createError } from "../utils/error.js";
import { redisClient } from "../redisConnection.js";

export const validateAccessToken = async (req, res, next) => {
  console.log("Middleware: Inside validateAccessToken");
  const token =
    req.cookies["refresh-token"] ||
    req.header("Authorization")?.replace("Bearer ", "");
  const _uuid = req.cookies["uuid"];

  // Options for JWT verification
  const options = {
    algorithms: ["HS256"],
    issuer: "DADHICH BUS",
    audience: _uuid,
  };

  if (!token) {
    console.log("validateAccessToken: No token provided");
    return next(createError(401, "You are not authenticated!"));
  }

  try {
    // JWT verification
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      options
    );

    if (!decoded?.id) {
      console.log(
        "validateAccessToken: Invalid token format (missing user ID)"
      );
      return next(createError(403, "Invalid token. Access forbidden."));
    }

    // UUID validation (comparing it with the stored UUID)
    const isUuidValid = await bcrypt.compare(
      `${decoded.id.toString()}${process.env.UUID_KEY}`,
      _uuid
    );

    if (!isUuidValid) {
      console.log("validateAccessToken: UUID does not match");
      return next(createError(403, "Invalid token. Access forbidden."));
    }

    // Check if the token exists in Redis
    const storedToken = await redisClient.get(_uuid);
    if (storedToken !== token) {
      console.log("validateAccessToken: Token does not match stored token");
      return next(createError(403, "Invalid token. Access forbidden."));
    }

    // Fetch user data from Redis or fallback to database
    let user;
    const cachedUser = await redisClient.get(`${decoded.id}_data`);

    if (!cachedUser) {
      console.log(
        "validateAccessToken: User not found in cache, fetching from DB..."
      );
      const _user = await User.getInfo({ _id: decoded.id }, { password: 0 });

      if (!_user) {
        console.log("validateAccessToken: User not found in DB");
        return next(createError(404, "User not found"));
      }

      // Cache the user data for future requests
      await redisClient.set(`${decoded.id}_data`, JSON.stringify(_user));
      user = _user;
    } else {
      console.log("validateAccessToken: User found in cache");
      user = JSON.parse(cachedUser); // Parse JSON string from Redis
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
      return next(createError(440, "Session expired. Please log in again."));
    }

    console.log("validateAccessToken: Invalid token");
    return next(createError(403, "Invalid token. Access forbidden."));
  }
};
