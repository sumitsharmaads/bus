import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUUID = (id) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(
    `${id?.toString()}${process.env.UUID_KEY}`,
    salt
  );
  return hash;
};

export const generateAccessToken = (user, uuid) => {
  console.log("controlled is inside generateAccessToken");
  const signInOptions = {
    algorithm: "HS256",
    issuer: "DADHICH BUS",
    audience: `${uuid}`,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  };
  return jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    signInOptions
  );
};

export const generateRefreshToken = (user) => {
  console.log("controlled is inside generateRefreshToken");
  const signInOptions = {
    algorithm: "HS256",
    issuer: "DADHICH BUS",
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  };
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    signInOptions
  );
};

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const getHostName = function (req) {
  let host = "";
  //get poxy hostName
  if (/^http(s)?\:\/\//.test(req.headers["referer"])) {
    //refer https://regexr.com/509b6
    host = String(req.headers["referer"]).replace(
      /(^https?\:\/\/[a-z0-9\_\-\.:]+)\/?(.+)?/gi,
      "$1"
    );
    // GLogger.log("host :",host);
    return host;
  }

  host = req.headers["x-forwarded-host"]
    ? req.headers["x-forwarded-host"]
    : req.headers["x-forwarded-server"];
  let proto =
    req.headers["X-Forwarded-Proto"] || /^https/gi.test(req.headers["origin"])
      ? "https"
      : "http";
  if (host) {
    host = proto + "://" + host.split(",")[0];
  }
  if (!host || !/^http(s?):\/\/\w+\.\w+/gi.test(host)) {
    // logger.warn("Can't got porxy hostname (replace with origin) :", host);
    host = req.headers["origin"] || `${req.protocol}://${req.headers["host"]}`;
  }
  return host;
};

export const makeString = (str) =>
  str === null || ((str === undefined) === str) === ""
    ? ""
    : str.toString().trim().toLowerCase();

/**
 * Validates OTP data by checking the request, JWT data, and OTP data.
 * @param {Object} req - The request object containing user input and flags.
 * @param {Object} jwtData - The JWT data containing user details.
 * @param {Object} otpData - The OTP data containing user and guest information.
 * @returns {boolean} - Returns true if the validation passes, false otherwise.
 */
export function validateOTPdData(req, jwtData, otpData) {
  const isGuest = req.isGuest;
  const { username: reqUsername, phone: reqPhone } = req.body;
  const { phone: jwtPhone, email: jwtEmail, username: jwtUsername } = jwtData;
  const { userId, guestId } = otpData;
  if (
    isGuest &&
    makeString(reqPhone) === makeString(jwtPhone) &&
    makeString(jwtPhone) === makeString(guestId.phone)
  ) {
    return true;
  }
  if (
    (makeString(reqUsername) === makeString(jwtEmail) &&
      makeString(jwtEmail) === makeString(userId.email)) ||
    (makeString(reqUsername) === makeString(jwtUsername) &&
      makeString(jwtUsername) === makeString(userId.username))
  ) {
    return true;
  }

  return false;
}
class Common {
  isNullOrEmpty = function (strVal) {
    if (typeof strVal == "object") {
      return Common.isEmptyObject(strVal);
    }
    if (
      strVal === "" ||
      strVal === null ||
      strVal === "null" ||
      strVal === undefined ||
      strVal === "undefined"
    ) {
      return true;
    } else {
      return false;
    }
  };

  isEmptyObject = function (O) {
    if (typeof O != "object") {
      return true;
    }
    for (let x in O) {
      return false;
    }
    return true;
  };
}
export default Common;
