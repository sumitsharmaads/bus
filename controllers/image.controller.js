import { createError } from "../utils/error.js";
import cloudinaryV2 from "../config/cloudinary.config.js";

export const uploadImage = async (req, res, next) => {
  console.log("inside upload image");
  try {
    // Check if the file is present in the request
    if (!req.file) {
      return next(createError(400, "No image uploaded"));
    }

    // Cloudinary upload options
    const uploadStream = cloudinaryV2.uploader.upload_stream(
      {
        folder: "dadhich_bus", // Specify a folder in Cloudinary
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return next(createError(500, "Error uploading image to Cloudinary"));
        }

        // Return the result of the upload (image URL, public_id, etc.)
        res.status(200).json({
          success: true,
          message: "Image uploaded successfully",
          data: result, // Contains the image's URL, public_id, etc.
        });
      }
    );

    // Pipe the file buffer to Cloudinary's upload stream
    uploadStream.end(req.file.buffer); // Use file buffer for memory storage
  } catch (error) {
    console.error("Error in image upload:", error);
    next(createError(500, "Internal server error"));
  }
};

export const deleteImage = async (req, res, next) => {
  //encode at frontend side
  const publicId = decodeURIComponent(req.params.public_id);

  console.log("controller inside delete image", publicId);
  if (!req?.params?.public_id) {
    return next(createError(400, "Failed to delete"));
  }
  try {
    const result = await cloudinaryV2.uploader.destroy(publicId);
    if (result.result === "ok") {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Image deleted successfully",
      });
    } else {
      return next(createError(500, "Error deleting image from Cloudinary"));
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    next(error);
  }
};
