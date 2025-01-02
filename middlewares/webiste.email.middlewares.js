import Website from "../models/website.model.js";
import { getHostName } from "../utils/common.js";
import { createError } from "../utils/error.js";

export const websiteDetails = async (req, _, next) => {
  console.log("Inside websiteDetails controller");
  const host = getHostName(req);
  try {
    const website = await Website.emailsGetInfo(host.toString().trim());
    if (website) {
      req.website = website;
      return next();
    }
    console.log("failed to get websiteDetails controller", host);
    next(createError(500, "Internal server error"));
  } catch (error) {
    console.log("websiteDetails controller: Error", error);
    return next(createError(500, "Internal server error"));
  }
};
