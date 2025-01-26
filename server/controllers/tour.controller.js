import Tour from "../models/tour.model.js";

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
