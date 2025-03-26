import placesModel from "../models/places.model.js";

export const getPlacesDetails = async (req, res, next) => {
  const { condition } = req.body;
  console.log("condition condition in getPlacesDetails", condition);
  try {
    const places = await placesModel.getAll(
      {
        items: 10,
        search: condition.search,
      },
      {
        id: 0,
        accentcity: 0,
        latitude: 0,
        longitude: 0,
      }
    );
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Password changed successfully.",
      result: places,
    });
  } catch (error) {
    console.log("error encouterd while getting all places", error);
    next(error);
  }
};

export const addPlace = async (req, res, next) => {
  try {
    const newPlace = await placesModel.add(req.body);
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Place added successfully.",
      result: newPlace,
    });
  } catch (error) {
    console.error("Error adding place:", error);
    next(error);
  }
};

export const updatePlace = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedPlace = await placesModel.updateInfo(id, req.body);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Place updated successfully.",
      result: updatedPlace,
    });
  } catch (error) {
    console.error("Error updating place:", error);
    next(error);
  }
};

export const checkCityExists = async (req, res, next) => {
  const { name } = req.body;
  try {
    const existingCity = await placesModel.findOne({ name });
    return res.status(200).json({
      success: true,
      status: 200,
      exists: !!existingCity,
    });
  } catch (error) {
    console.error("Error checking city existence:", error);
    next(error);
  }
};

export const getAllPlaces = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const {
      search = {},
      page = 1,
      items = 10,
      isCount = true,
    } = req?.body?.condition;

    const condition = {
      search,
      page,
      items,
      isCount,
    };
    const response = await placesModel.getAll(condition);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const bulkUploadPlaces = async (req, res, next) => {
  try {
    if (!req.body.places || !Array.isArray(req.body.places)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: 'places' should be an array.",
      });
    }

    const { skippedRecords } = await placesModel.bulkImport(req.body.places);
    return res.status(200).json({
      success: true,
      message: "Bulk upload completed.",
      data: {
        skippedCount: skippedRecords.length,
        skippedRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};
