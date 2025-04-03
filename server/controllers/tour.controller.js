import mongoose from "mongoose";
import Tour from "../models/tour.model.js";
import { createError } from "../utils/error.js";

export const addTour = async (req, res, next) => {
  try {
    const tour = await Tour.add(req.body);
    if (tour) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Tour has been created successfully.",
      });
    } else {
      return next(createError(500, "Failed to create tour"));
    }
  } catch (error) {}
};

export const upcomingTours = async (req, res, next) => {
  try {
    const tours = await Tour.getUpcomingTours();
    return res.status(200).json({
      success: true,
      status: 200,
      message: tours.length
        ? "Upcoming tours fetched successfully."
        : "No upcoming tours available.",
      data: tours,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

export const getAllAdminTours = async (req, res, next) => {
  try {
    const {
      search = {},
      status,
      page = 1,
      items = 10,
      startDate,
      endDate,
      isCount = true,
    } = req.body;

    const condition = {
      search,
      status,
      page,
      items,
      startDate,
      endDate,
      isCount,
    };
    const { count, result } = await Tour.getAll(condition, false);
    return res.status(200).json({
      success: true,
      status: 200,
      message: result.length
        ? "Tours fetched successfully."
        : "No tours available.",
      data: {
        result,
        count,
      },
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

const handleError = (
  res,
  error,
  status = 500,
  message = "Something went wrong"
) => {
  console.error("TourControllerError:", error);
  return res
    .status(status)
    .json({ success: false, message, error: error.message });
};

export const createTour = async (req, res) => {
  try {
    const tour = await Tour.add(req.body);
    res.status(201).json({ success: true, result: tour });
  } catch (error) {
    return handleError(res, error, 400, "Failed to create tour");
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.getById(req.params.id);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, result: tour });
  } catch (error) {
    return handleError(res, error, 500, "Failed to fetch tour");
  }
};

export const updateTourPatch = async (req, res) => {
  try {
    const tour = await Tour.updatePatch(req.params.id, req.body);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, result: tour });
  } catch (error) {
    return handleError(res, error, 400, "Failed to patch update tour");
  }
};

export const updateTourPut = async (req, res) => {
  try {
    const tour = await Tour.updatePut(req.params.id, req.body);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, result: tour });
  } catch (error) {
    return handleError(res, error, 400, "Failed to fully update tour");
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    if (tour.status === 2) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a published tour. Please unpublish it first.",
      });
    }

    await Tour.deleteById(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Tour deleted successfully" });
  } catch (error) {
    console.error("deleteTourError:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete tour",
      error: error.message,
    });
  }
};

export const serachTourByName = async (req, res, next) => {
  try {
    const { q = "" } = req.query;
    if (!q.trim()) {
      return res.status(200).json({ success: true, data: [] });
    }
    const data = await Tour.serachTour(q);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during search",
    });
  }
};

export const getStateWiseData = async (req, res, next) => {
  try {
    const data = await Tour.getSateBasedData();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
