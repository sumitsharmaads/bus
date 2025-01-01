import mongoose from "mongoose";
import Common from "../utils/common.js";

const GSchema = mongoose.Schema;

const PlacesSchema = new GSchema(
  {
    id: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    accentcity: {
      type: String,
      trim: true,
      unique: true,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  { timestamps: true }
);

PlacesSchema.plugin(function (schema) {
  schema.statics.add = async function (placeInfo) {
    const model = this;
    try {
      const { id, city, state } = placeInfo;
      if (!id || !city || !state) {
        throw new Error("Provide mandatrory fields");
      }
      const place = new model(placeInfo);
      await place.save();
      return place;
    } catch (error) {
      throw new Error("Failed to save place", error);
    }
  };

  schema.statics.updateInfo = async function (id, updatedInfo) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Provide a proper id");
    const model = this;
    try {
      const place = await model.findByIdAndUpdate(
        mongoose.Types.ObjectId(id),
        {
          $set: updatedInfo,
        },
        { new: true }
      );
      return place;
    } catch (error) {
      throw new Error("failed to update record", error);
    }
  };

  schema.statics.deletePlaces = async function (condition) {
    const model = this;
    try {
      const deleted = await model.deleteMany(condition);
      return deleted;
    } catch (error) {
      throw new Error("failed to delete places", error);
    }
  };

  schema.statics.deletePlaceById = async function (id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Provide a proper id");
    try {
      const deletedPlace = await this.deleteById(id);
      return deletedPlace;
    } catch (error) {
      throw new Error("failed delete place", error);
    }
  };

  schema.statics.getInfo = async function (condition) {
    try {
      const info = await this.find(condition);
      return info;
    } catch (error) {
      throw new Error("failed to fetch info", condition);
    }
  };

  schema.statics.getAll = async function (condition, projection = {}) {
    const model = this;
    const {
      page = 1,
      items = 10000,
      isCount = false,
      search,
      sort = { city: 1 },
    } = condition || {};
    const tempCondition = {};
    if (!Common.isNullOrEmpty(search)) {
      const filters = [];
      for (const key in search) {
        filters.push({ [key]: { $regex: new RegExp(search[key], "i") } });
      }
      tempCondition.$or = filters;
    }
    try {
      if (isCount) {
        const count = await model.countDocuments(tempCondition);
        const result = await model
          .find(tempCondition, { projection })
          .limit(items)
          .skip((page - 1) * items)
          .sort(sort);
        return {
          count,
          result,
        };
      } else {
        const result = await model
          .find(tempCondition, { projection })
          .limit(items)
          .skip((page - 1) * items)
          .sort(sort);
        console.log("result", result);
        return {
          count: null,
          result,
        };
      }
    } catch (error) {
      console.log("failed to parse places", error);
      throw new Error("failed to get all places", error);
    }
  };
});

export default mongoose.model("places", PlacesSchema);
