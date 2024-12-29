import jwt from "jsonwebtoken";
import { redisClient } from "../redisConnection.js";
import { createUUID, generateAccessToken } from "../utils/common.js";
import { createError } from "../utils/error.js";

export const refreshToken = async function (req, res, next) {
  console.log("Controller: inside refreshToken");
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken) {
    console.error("refreshToken: Refresh token is missing in request cookies");
    return next(createError(401, "No refresh token provided"));
  }

  const options = {
    algorithms: ["HS256"],
    issuer: "DADHICH BUS",
  };

  try {
    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      options,
      async (err, user) => {
        if (err) {
          console.error("refreshToken: JWT verification failed", err);

          if (err.name === "TokenExpiredError") {
            console.warn("refreshToken: Refresh token expired");
            return next(
              createError(440, "Session expired. Please log in again.")
            );
          }

          console.error(
            "refreshToken: Invalid refresh token, access forbidden"
          );
          return next(createError(403, "Invalid token. Access forbidden."));
        }
        // Check if the refresh token is stored in Redis
        const storedToken = await redisClient.get(user.id);
        console.log("storedToken", storedToken);
        if (storedToken !== refreshToken) {
          console.error(
            "refreshToken: Stored token does not match the provided refresh token"
          );
          return next(createError(403, "Invalid refresh token"));
        }
        const uuid = createUUID(user.id);
        const newAccessToken = generateAccessToken({ _id: user.id }, uuid);
        await redisClient.del(user.id);
        await redisClient.set(uuid, newAccessToken, "EX", 15 * 60);
        const cookiesOption = {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        };

        return res
          .cookie("uuid", uuid, cookiesOption)
          .cookie("access-token", newAccessToken, {
            ...cookiesOption,
            maxAge: 15 * 60 * 1000, // 15 minutes
          })
          .status(200)
          .json({
            success: true,
            status: 200,
            message: "Validated user",
            result: {
              token: newAccessToken,
            },
          });
      }
    );
  } catch (error) {
    console.error("refreshToken: Error in refreshToken function:", error);
    if (error.name === "JsonWebTokenError") {
      return next(createError(403, "Invalid refresh token. Access forbidden."));
    }
    if (error.name === "TokenExpiredError") {
      return next(createError(440, "Session expired. Please log in again."));
    }
    return next(createError(500, "Internal server error"));
  }
};
