import Website from "../models/website.model.js";
import { getHostName } from "../utils/common.js";
import { createError } from "../utils/error.js";

export const updateWebsite = async function () {};

export const getWebsiteInfo = async function (req, res, next) {
  const host = getHostName(req);
  try {
    const website = await Website.emailsGetInfo(host.toString().trim());
    if (website) {
      req.website = website;
      return res.status(200).json({
        success: true,
        message: "Retrived website data",
        result: website,
      });
    }
    console.log("failed to get websiteDetails controller", host);
    next(createError(500, "Internal server error"));
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const websiteUpdateController = async (req, res, next) => {
  const { id } = req.params;
  const io = req.io;
  const hostName = getHostName(req);
  try {
    const updatedWebsite = await Website.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedWebsite) {
      next(createError(500, "Website settings not found"));
    }
    io.to(hostName).emit("website-updated", updatedWebsite);
    res.status(200).json({
      success: true,
      message: "Website settings updated successfully.",
      data: updatedWebsite,
    });
  } catch (error) {
    next(createError(500, "Failed to update website settings"));
  }
};
