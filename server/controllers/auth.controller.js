import jwt from "jsonwebtoken";
import { createError, invalidSessionError } from "../utils/error.js";
import User from "../models/user.model.js";
import {
  generateOTP,
  createUUID,
  generateAccessToken,
  generateRefreshToken,
  getExpirationDate,
} from "../utils/common.js";
import { Otp } from "../models/otp.model.js";
import EmailUtil from "../utils/EmailUtil.js";
import {
  ACCESS_TOKEN_EXPIRY_UTIL,
  REFRESH_TOKEN_EXPIRY_UTIL,
} from "../utils/constant.js";
import { Token } from "../models/token.model.js";

export const register = async (req, res, next) => {
  console.log("Controller: Register user");
  const { fullname, email, password, username } = req.body;
  if (!fullname || !email || !password) {
    console.log("Error: Missing mandatory fields during registration.");
    cre;
    return next(createError(400, "Please provide all mandatory fields"));
  }
  if (!username) {
    req.body.username = email.split("@")[0];
  }
  try {
    const user = await User.register(req.body);
    if (user) {
      console.log("User registered successfully.");
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User has been created successfully.",
      });
    }
    console.log("Error: User creation failed.");
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to create user.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error?.message?.includes("Email or Username is already taken")) {
      console.log("Error: Email or Username is already taken.");
      return next(createError(409, "Email or Username is already taken."));
    }
    return next(
      createError(
        500,
        error.message || "An unexpected error occurred during registration."
      )
    );
  }
};

export const login = async (req, res, next) => {
  console.log("Controller: Login user");
  const { username, password } = req.body;
  if (!username || !password) {
    console.log("Error: Missing mandatory fields during login.");
    return next(createError(400, "Please provide all mandatory fields"));
  }

  try {
    const existingUser = await User.getInfo({
      $or: [{ username: username }, { email: username }],
    });

    if (!existingUser) {
      console.log("Error: User not found.");
      return next(
        createError(404, "User not found. Please check your username or email.")
      );
    }

    const isCorrectPassword = await existingUser.isCorrectPassword(password);
    if (!isCorrectPassword) {
      console.log("Error: Invalid password.");
      return next(createError(401, "Invalid password. Please try again."));
    }

    // Generate OTP and expiration
    const otp = generateOTP();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry
    const otpData = await Otp.addOtp({
      otp,
      userId: existingUser._id,
      expiryDate,
    });

    if (!otpData) {
      console.log("Error: Failed to generate OTP.");
      return next(
        createError(500, "Failed to generate OTP. Please try again.")
      );
    }

    const emailSend = await EmailUtil.sendEmailWithTemplate(
      existingUser.email,
      "Your OTP Code for Secure Login",
      {
        data: {
          otp,
          ...(req.website || {}),
        },
        req,
        template: "otp_template.html",
      }
    );

    if (!emailSend) {
      console.log("Error: Failed to send OTP email.");
      return next(
        createError(500, "Failed to send OTP email. Please try again.")
      );
    }

    // Create JWT payload and cookie
    const signInOptions = {
      algorithm: "HS256",
      issuer: "DADHICH BUS",
      expiresIn: "5m",
    };
    const payload = {
      email: existingUser.email,
      name: existingUser.fullname,
      username: existingUser.username,
      otpid: otpData._id,
    };

    const generateCookie = jwt.sign(
      payload,
      process.env.SECRET_OTP_KEY,
      signInOptions
    );

    const updatedUser = await User.updateUser(existingUser._id, {
      loginOTP: {
        token: generateCookie,
        otpid: otpData._id,
      },
    });

    if (!updatedUser) {
      console.log("Error: Failed to update user with OTP information.");
      return next(
        createError(
          500,
          "Failed to update user with OTP information. Please try again."
        )
      );
    }

    console.log("OTP generated and email sent successfully.");
    return res
      .cookie("hash-id", generateCookie, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "Please verify your OTP from your email.",
      });
  } catch (error) {
    console.error("Error during login:", error);
    if (error.name === "ValidationError") {
      console.log("Error: Invalid input data.");
      return next(createError(400, "Invalid input data."));
    }
    return next(createError(500, "An unexpected error occurred during login."));
  }
};

export const verifyOtp = async (req, res, next) => {
  console.log("Controller: Verify OTP");
  const fieldName = "loginOTP";
  try {
    const _user = req.user; // Populated by the validateOtp middleware
    if (!_user) {
      console.log("Error: User not found in the request.");
      return next(
        createError(400, "User not found. Please retry sending OTP.")
      );
    }

    const existingUser = await User.getInfo(
      {
        $and: [{ username: _user.username }, { email: _user.email }],
      },
      {
        fullname: 1,
        email: 1,
        phone: 1,
        username: 1,
        roleType: 1,
        gender: 1,
        loginOTP: 1,
      }
    );

    if (!existingUser) {
      console.log("Error: User does not exist.");
      return next(createError(400, "Please retry sending OTP."));
    }
    if (!existingUser[fieldName]) {
      console.log(`Error: ${fieldName} does not exist.`);
      return next(createError(400, "Please retry sending OTP."));
    }
    if (
      existingUser?.[fieldName]?.token?.toString() !==
      req.cookies["hash-id"]?.toString()
    ) {
      console.log("Error: OTP token mismatch.");
      return next(createError(400, "Invalid OTP, please retry again."));
    }

    // const uuid = createUUID(existingUser?._id);
    // if (!uuid || uuid instanceof Error) {
    //   console.log("Error: Failed to create UUID.");
    //   return next(createError(500, "Internal Server Error."));
    // }
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    const accessTokenExpiry = getExpirationDate(
      process.env.ACCESS_TOKEN_EXPIRATION
    );
    const expiryDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_UTIL);
    await Token.addToken({
      token: refreshToken,
      userId: existingUser?._id,
      expiryDate,
    });
    const cookiesOption = {
      httpOnly: true,
      secure: process.env.Environment !== "development",
      sameSite: process.env.Environment !== "development" ? "None" : "Lax",
    };
    if (existingUser[fieldName]) {
      delete existingUser[fieldName];
    }

    return (
      res
        .clearCookie("hash-id")
        //.cookie("uuid", uuid, cookiesOption)
        .cookie("refreshToken", refreshToken, {
          ...cookiesOption,
          signed: true,
          maxAge: REFRESH_TOKEN_EXPIRY_UTIL,
        })
        .status(200)
        .json({
          success: true,
          status: 200,
          message: "OTP verified successfully.",
          result: {
            token: accessToken,
            user: existingUser,
            expiryTime: accessTokenExpiry,
          },
        })
    );
  } catch (error) {
    console.error("verifyOtp:Error during OTP verification:", error);
    return next(
      createError(500, "An unexpected error occurred during OTP verification.")
    );
  }
};

export const forgotPassword = async (req, res, next) => {
  console.log("Controller: Forgot password");
  const { username } = req.body;
  if (!username) {
    console.log("Error: Missing username during forgot password request.");
    return next(createError(400, "Please provide all mandatory fields"));
  }
  try {
    const existingUser = await User.getInfo({
      $or: [{ username: username }, { email: username }],
    });

    if (!existingUser) {
      console.log("Error: User not found.");
      return next(
        createError(404, "User not found. Please check your username or email.")
      );
    }

    // Generate OTP and expiration
    const otp = generateOTP();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10-minute expiry
    const otpData = await Otp.addOtp({
      otp,
      userId: existingUser._id,
      expiryDate,
    });

    if (!otpData) {
      console.log("Error: Failed to generate OTP.");
      return next(
        createError(500, "Failed to generate OTP. Please try again.")
      );
    }

    const emailSend = await EmailUtil.sendEmailWithTemplate(
      existingUser.email,
      "Your OTP Code for Retrieve your account",
      {
        data: {
          otp,
          ...(req.website || {}),
        },
        req,
        template: "otp_template_forgot_password.html",
      }
    );

    if (!emailSend) {
      console.log("Error: Failed to send OTP email.");
      return next(
        createError(500, "Failed to send OTP email. Please try again.")
      );
    }

    const signInOptions = {
      algorithm: "HS256",
      issuer: "DADHICH BUS",
      expiresIn: "5m",
    };
    const payload = {
      email: existingUser.email,
      name: existingUser.fullname,
      username: existingUser.username,
      otpid: otpData._id,
    };

    const generateCookie = jwt.sign(
      payload,
      process.env.SECRET_OTP_KEY,
      signInOptions
    );

    const updatedUser = await User.updateUser(existingUser._id, {
      forgotPasswordOTP: {
        token: generateCookie,
        otpid: otpData._id,
      },
    });

    if (!updatedUser) {
      console.log("Error: Failed to update user with OTP information.");
      return next(
        createError(
          500,
          "Failed to update user with OTP information. Please try again."
        )
      );
    }

    console.log("OTP generated and email sent successfully.");
    return res
      .cookie("hash-id", generateCookie, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "Please verify your OTP from your email.",
      });
  } catch (error) {
    console.error("Error during forgot password request:", error);
    if (error.name === "ValidationError") {
      console.log("Error: Invalid input data.");
      return next(createError(400, "Invalid input data."));
    }
    return next(
      createError(500, "An unexpected error occurred during forgot password.")
    );
  }
};

export const resetPassword = async (req, res, next) => {
  console.log("Controller: Reset password");
  const { username, password } = req.body;
  const _user = req.user;
  if (!username || !password) {
    console.log("Error: Missing mandatory fields during reset password.");
    return next(createError(400, "Please provide all mandatory fields"));
  }
  try {
    if (!_user) {
      console.log("Error: User not found in the request.");
      return next(
        createError(400, "User not found. Please retry sending OTP.")
      );
    }

    const existingUser = await User.getInfo(
      {
        $and: [{ username: _user.username }, { email: _user.email }],
      },
      {
        password: 0,
        loginTime: 0,
        logs: 0,
      }
    );
    if (!existingUser) {
      console.log("Error: User does not exist.");
      return next(createError(400, "Please retry sending OTP."));
    }
    if (!existingUser?.forgotPasswordOTP) {
      console.log("Error: Forgot password OTP does not exist.");
      return next(createError(400, "Please retry sending OTP."));
    }
    if (
      existingUser?.forgotPasswordOTP?.token?.toString() !==
      req.cookies["hash-id"]?.toString()
    ) {
      console.log("Error: OTP token mismatch.");
      return next(createError(400, "Invalid OTP, please retry again."));
    }

    const updateUser = await User.resetPassword(existingUser._id, password);
    if (!updateUser) {
      console.log("Error: Failed to update user password.");
      return next(createError(500, "Failed to update user. Please try again."));
    }

    console.log("Password reset successfully.");
    return res.status(201).json({
      success: true,
      status: 200,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    return next(
      createError(500, "An unexpected error occurred during password reset.")
    );
  }
};

export const logoutHandler = async (req, res, next) => {
  const { signedCookies } = req;
  const { refreshToken } = signedCookies;
  if (!refreshToken) {
    console.error("refreshToken: Refresh token is missing in request cookies");
    return invalidSessionError(res, next, "No refresh token provided");
  }
  try {
    const refreshTokenInDb = await Token.findByToken(refreshToken);
    if (!refreshTokenInDb) {
      return invalidSessionError(res, next, "Invalid refresh token");
    }
    await Token.deleteOne({ _id: refreshTokenInDb._id });
    res.clearCookie("refreshToken");
    res.clearCookie("uuid");
    return res.status(200).json({
      success: true,
      status: 200,
      message: "User logout sucesssfully",
    });
  } catch (error) {
    console.log(error);
    return invalidSessionError(res, next);
  }
};
