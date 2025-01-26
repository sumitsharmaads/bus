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
