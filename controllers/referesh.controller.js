import bcrypt from "bcryptjs";
import {
  createUUID,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/common.js";
import { createError } from "../utils/error.js";
import { Token } from "../models/token.model.js";
import {
  REFRESH_TOKEN_EXPIRY_UTIL,
  ACCESS_TOKEN_EXPIRY_UTIL,
} from "../utils/constant.js";

export const refreshToken = async function (req, res, next) {
  console.log("Controller: inside refreshToken");
  const { signedCookies } = req;
  const { refreshToken } = signedCookies;
  const _uuid = req.cookies["uuid"];
  const currentDate = new Date();
  if (!refreshToken) {
    console.error("refreshToken: Refresh token is missing in request cookies");
    return next(createError(401, "No refresh token provided"));
  }

  try {
    const refreshTokenInDb = await Token.findByToken(refreshToken);
    if (!refreshTokenInDb) {
      return next(createError(401, "Invalid token"));
    }
    const user = refreshTokenInDb.userId;
    const isUuidValid = await bcrypt.compare(
      `${user._id.toString()}${process.env.UUID_KEY}`,
      _uuid
    );
    const tokenExpiryDate = new Date(refreshTokenInDb.expiryDate);
    if (!isUuidValid) {
      console.log("refresh token: UUID does not match");
      return next(createError(403, "Invalid token. Access forbidden."));
    }
    const timeDifference = tokenExpiryDate.getTime() - currentDate.getTime();
    const uuid = createUUID(user._id);
    const newAccessToken = generateAccessToken({ _id: user._id }, uuid);
    let refrehToken;
    if (timeDifference <= ACCESS_TOKEN_EXPIRY_UTIL) {
      const expiryDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_UTIL);
      refrehToken = generateRefreshToken({ _id: user._id });
      await Token.deleteOne({ token: refreshToken });
      await Token.addToken({
        token: refrehToken,
        userId: user._id,
        expiryDate,
      });
    }
    const cookiesOption = {
      httpOnly: true,
      secure: process.env.Environment !== "development",
      sameSite: "None",
    };
    if (refrehToken) {
      return res
        .cookie("uuid", uuid, cookiesOption)
        .cookie("refreshToken", refrehToken, {
          ...cookiesOption,
          signed: true,
          maxAge: REFRESH_TOKEN_EXPIRY_UTIL,
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
    } else {
      return res
        .cookie("uuid", uuid, cookiesOption)
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
  } catch (error) {
    console.error("refreshToken: Error in refreshToken function:", error);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("uuid");
    if (error.name === "JsonWebTokenError") {
      return next(createError(403, "Invalid refresh token. Access forbidden."));
    }
    return next(createError(500, "Internal server error"));
  }
};
