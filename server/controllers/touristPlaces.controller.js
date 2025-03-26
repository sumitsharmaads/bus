import TouristPlaces from "../models/TouristPlaces.model.js";
import { createError } from "../utils/error.js";

/**
 * @desc Get all places (Public API)
 * @route GET /api/places
 * @access Public
 */
exports.getAllPlaces = async (req, res, next) => {
  try {
    const data = await TouristPlaces.getAllPlaces(req.body);
    res.status(200).json({
      success: true,
      status: 200,
      message: data.length
        ? "tourist  places fetched successfully."
        : "No tourist places available.",
      data,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * @desc Get a single place with full details (Public API)
 * @route GET /api/places/:id
 * @access Public
 */
exports.getPlaceById = async (req, res, next) => {
  try {
    const place = await TouristPlaces.getPlaceById(req.params.id);
    res.status(200).json({ success: true, data: place });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * @desc Create a new place (Admin API)
 * @route POST /api/admin/places
 * @access Private (Admin)
 */
exports.createPlace = async (req, res, next) => {
  try {
    const place = await TouristPlaces.createPlace(req.body);
    res.status(201).json({ success: true, data: place });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * @desc Update place details (Admin API)
 * @route PUT /api/admin/places/:id
 * @access Private (Admin)
 */
exports.updatePlace = async (req, res, next) => {
  try {
    const place = await TouristPlaces.updatePlace(req.params.id, req.body);
    res.status(200).json({ success: true, data: place });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * @desc Delete a place (Admin API)
 * @route DELETE /api/admin/places/:id
 * @access Private (Admin)
 */
exports.deletePlace = async (req, res, next) => {
  try {
    const place = await TouristPlaces.deletePlace(req.params.id);
    res.status(200).json({ success: true, message: "Tourist place deleted" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * @desc Get sections info (Admin API)
 * @route GET /api/admin/places/:id/sections
 * @access Private (Admin)
 */
exports.getSections = async (req, res, next) => {
  try {
    const sections = await TouristPlace.getSections(req.params.id);
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * @desc Add a new section (Admin API)
 * @route POST /api/admin/places/:id/sections
 * @access Private (Admin)
 */
exports.addSection = asyncHandler(async (req, res, next) => {
  const sections = await TouristPlace.addSection(req.params.id, req.body);
  if (!sections) return next(new ErrorResponse("Place not found", 404));

  res.status(201).json({ success: true, data: sections });
});

/**
 * @desc Update a section (Admin API)
 * @route PUT /api/admin/places/:id/sections/:sectionId
 * @access Private (Admin)
 */
exports.updateSection = asyncHandler(async (req, res, next) => {
  const sections = await TouristPlace.updateSection(
    req.params.id,
    req.params.sectionId,
    req.body
  );
  if (!sections)
    return next(new ErrorResponse("Place or section not found", 404));

  res.status(200).json({ success: true, data: sections });
});

/**
 * @desc Delete a section (Admin API)
 * @route DELETE /api/admin/places/:id/sections/:sectionId
 * @access Private (Admin)
 */
exports.deleteSection = asyncHandler(async (req, res, next) => {
  const sections = await TouristPlace.deleteSection(
    req.params.id,
    req.params.sectionId
  );
  if (!sections)
    return next(new ErrorResponse("Place or section not found", 404));

  res.status(200).json({ success: true, data: sections });
});
