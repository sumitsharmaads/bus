import mongoose from "mongoose";
import Common from "../utils/common.js";

/**
 * Tour Schema for storing tour details.
 *
 * @typedef {Object} TourDocument
 * @property {Array} source - Array of source locations.
 * @property {string} destination - The destination of the tour.
 * @property {string} tourname - The name of the tour.
 * @property {Array} places - List of places to be visited during the tour.
 * @property {string} image - The image associated with the tour.
 * @property {Date} startDate - The start date of the tour.
 * @property {Date} endDate - The end date of the tour.
 * @property {Array} stayDescription - List of stays during the tour.
 * @property {mongoose.Schema.Types.ObjectId} bus - Reference to the bus document.
 * @property {Array} hotel - Array of hotel references.
 * @property {string} minfair - Minimum fare for the tour.
 * @property {boolean} isActive - Indicates if the tour is active.
 * @property {Date} createdAt - Auto-generated timestamp for when the tour was created.
 * @property {Date} updatedAt - Auto-generated timestamp for when the tour was last updated.
 * @property {Number} status - 0 means draft and 1 means published
 */
const GSchema = mongoose.Schema;
const SourceItemSchema = new GSchema({
  location: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "places",
      required: true,
    },
    name: String,
    state: String,
  },
  fare: { type: Number, required: true },
  onBoarding: { type: [String], default: [] },
});

const ItenarySchema = new GSchema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  toggles: { type: [String], default: [] },
  sightseeing: { type: [String], default: [] },
  order: { type: Number },
});

const placesSchema = new GSchema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "places",
      required: true,
    },
    name: String,
    state: String,
    id: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  },
  {
    id: false, // ✅ disables Mongoose's default `.id` virtual
    _id: false, // optional, only if this is a subdocument and you want to skip auto _id
  }
);
const TourSchema = new GSchema(
  {
    source: { type: [SourceItemSchema], required: true },
    tourname: {
      type: String,
      required: true,
    },
    description: { type: String },
    places: { type: [placesSchema], required: true },
    image: {
      url: String,
      id: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: String,
    stayDescription: [
      {
        nights: { type: Number },
        place: { type: String },
      },
    ],
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus", // Reference to bus document
    },
    captin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    inclusive: { type: [String], required: true },
    type: { type: [String], required: true },
    capacity: { type: Number, required: true },
    days: Number,
    night: Number,
    minfair: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    itenary: [ItenarySchema],
    seo: {
      title: String,
      description: String,
      keywords: String,
    },
    status: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

TourSchema.index({ "places.name": 1 });
TourSchema.index({ "places.state": 1 });
TourSchema.index({ minfair: 1 });
TourSchema.index({ night: 1 });
TourSchema.index({ inclusive: 1 });
TourSchema.index({ type: 1 });
TourSchema.index({ description: 1 });

TourSchema.plugin(function (schema) {
  TourSchema.statics.add = async function (data) {
    try {
      const tour = new this(data);
      return await tour.save();
    } catch (error) {
      throw new Error("Failed to create tour: " + error.message);
    }
  };
  schema.statics.updateBasicInfo = async function (id, data) {
    try {
      const result = await this.updateOne({ _id: id }, { $set: data });
      if (result.matchedCount === 0) {
        throw Error("tour details not found");
      }
      return result;
    } catch (error) {
      throw new Error("failed to update record", error);
    }
  };

  TourSchema.statics.getUpcomingTours = async function () {
    try {
      const currentDate = new Date();

      const tours = await this.aggregate([
        {
          $match: {
            startDate: { $gte: currentDate },
            status: 2,
          },
        },
        { $sort: { startDate: 1 } },
        { $limit: 4 },
        {
          $project: {
            image: 1,
            startDate: 1,
            tourname: 1,
            days: 1,
            night: 1,
            places: {
              $map: {
                input: "$places",
                as: "place",
                in: "$$place.name",
              },
            },
          },
        },
      ]);

      return tours;
    } catch (error) {
      throw new Error("Failed to fetch upcoming tours: " + error.message);
    }
  };

  schema.statics.getAll = async function (condition, countFlagOnly) {
    /** @type {model} */
    const model = this;
    const {
      isCount,
      search,
      status,
      page = 1,
      items = 10000,
      sort = { startDate: -1 },
      timeRangeName = "startDate",
      startDate,
      endDate,
    } = condition || {};
    const tempCondition = {};
    if (!Common.isNullOrEmpty(search)) {
      const filters = [];
      for (const key in search) {
        if (key === "places" || key === "source") {
          filters.push({
            [key]: { $elemMatch: { $regex: new RegExp(search[key], "i") } },
          });
        } else {
          filters.push({ [key]: { $regex: new RegExp(search[key], "i") } });
        }
      }
      tempCondition.$or = filters;
    }
    if (status || status === 0) {
      tempCondition.status = status;
    }
    if (startDate || endDate) {
      let timeRangeConditions = {};
      if (startDate) {
        timeRangeConditions[timeRangeName] = { $gte: new Date(startDate) };
      }
      if (endDate) {
        timeRangeConditions[timeRangeName] =
          timeRangeConditions[timeRangeName] || {};
        timeRangeConditions[timeRangeName].$lte = new Date(endDate);
      }
      tempCondition = { ...tempCondition, ...timeRangeConditions };
    }
    try {
      if (countFlagOnly) {
        const count = await model.countDocuments(tempCondition);
        return {
          count,
          users: null,
        };
      } else if (isCount) {
        const count = await model.countDocuments(tempCondition);
        const result = await model
          .find(tempCondition)
          .limit(items)
          .skip((page - 1) * items)
          .sort(sort);
        return {
          count,
          result,
        };
      } else {
        const result = await model
          .find(tempCondition)
          .limit(items)
          .skip((page - 1) * items)
          .sort(sort);
        return {
          count: null,
          result,
        };
      }
    } catch (error) {
      throw new Error(`Failed to retrieve tours: ${error.message}`);
    }
  };

  schema.statics.updatePatch = async function (id, data) {
    try {
      const result = await this.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      if (!result) throw new Error("Tour not found");
      return result;
    } catch (error) {
      throw new Error("Patch update failed: " + error.message);
    }
  };

  schema.statics.updatePut = async function (id, data) {
    try {
      const result = await this.findOneAndReplace({ _id: id }, data, {
        new: true,
        overwrite: true,
      });
      if (!result) throw new Error("Tour not found");
      return result;
    } catch (error) {
      throw new Error("Put update failed: " + error.message);
    }
  };

  schema.statics.getById = async function (id) {
    try {
      return await this.findById(id).populate("bus").populate("captin").exec();
    } catch (error) {
      throw new Error("Failed to get tour: " + error.message);
    }
  };

  schema.statics.deleteById = async function (id) {
    try {
      const deleted = await this.findByIdAndDelete(id);
      if (!deleted) throw new Error("Tour not found");
      return deleted;
    } catch (error) {
      throw new Error("Failed to delete tour: " + error.message);
    }
  };

  schema.statics.getSateBasedData = async function () {
    const now = new Date();
    try {
      const stateCount = await this.aggregate([
        {
          $match: {
            status: 2,
            startDate: { $gte: now },
          },
        },
        {
          $project: {
            states: {
              $map: {
                input: "$places",
                as: "p",
                in: "$$p.state",
              },
            },
          },
        },
        { $unwind: "$states" },
        {
          $group: {
            _id: "$states",
            count: { $sum: 1 }, // now this counts tour per state
          },
        },
        {
          $project: {
            _id: 0,
            state: "$_id",
            count: 1,
          },
        },
      ]);

      return stateCount;
    } catch (error) {
      throw new Error(
        "Failed to retrieve state-wise tour data: " + error.message
      );
    }
  };

  schema.statics.searchTour = async function (queryString) {
    console.log("inside searchTour method", queryString);
    try {
      if (!queryString.trim()) {
        return [];
      }

      const regex = new RegExp(queryString, "i");
      const now = new Date();
      const tours = await this.aggregate([
        {
          $match: {
            status: 2,
            startDate: { $gte: now },
            $or: [
              { tourname: { $regex: regex } },
              { description: { $regex: regex } },
              { "places.name": { $regex: regex } },
              { "places.state": { $regex: regex } },
            ],
          },
        },
        {
          $unwind: "$source", // Unwind the source array to process each source individually
        },
        {
          $addFields: {
            price: {
              $cond: [
                { $in: ["$source.fare", [0, NaN, undefined]] }, // If source fare is 0, NaN, or undefined
                "$minfair", // Use minfair as price
                "$source.fare", // Otherwise, use the source fare
              ],
            },
          },
        },
        {
          $project: {
            _id: 1, // Only return necessary fields
            tourname: 1,
            //description: 1,
            minfair: { $toDouble: "$minfair" },
            price: 1, // Include calculated price based on source fare or minfair
            sourceName: "$source.location.name", // Include the source name
            days: 1,
            night: 1,
            places: {
              $map: {
                input: "$places",
                as: "p",
                in: "$$p.state",
              },
            },
          },
        },
        {
          $sort: { price: 1 }, // Sort by price (either source fare or minfair)
        },
        {
          $limit: 20, // Limit the results for autocomplete
        },
      ]);

      if (!tours) throw new Error("Unable to retrieve data");
      return tours;
    } catch (error) {
      console.log("searchTour error", error);
      throw new Error("Failed to retrieve data: " + error.message);
    }
  };

  schema.statics.filterTours = async function (filters) {
    try {
      const {
        places,
        minPrice,
        maxPrice,
        minNights,
        maxNights,
        inclusive,
        type,
        page = 1,
        limit = 10,
        sortBy = "minfair",
        sortOrder = "asc",
      } = filters;

      const now = new Date();
      const match = {
        status: 2,
        startDate: { $gte: now },
      };

      if (places) {
        const regex = new RegExp(places, "i");
        match.$or = [{ "places.name": regex }, { "places.state": regex }];
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        match.minfair = {};
        if (minPrice !== undefined) match.minfair.$gte = parseFloat(minPrice);
        if (maxPrice !== undefined) match.minfair.$lte = parseFloat(maxPrice);
      }

      if (minNights !== undefined || maxNights !== undefined) {
        match.night = {};
        if (minNights !== undefined) match.night.$gte = parseInt(minNights);
        if (maxNights !== undefined) match.night.$lte = parseInt(maxNights);
      }

      if (inclusive && inclusive.length) {
        match.inclusive = { $all: inclusive };
      }

      if (type && type.length) {
        match.type = { $in: type };
      }

      const skip = (page - 1) * limit;

      const sortField = sortBy === "night" ? "night" : "minfair";
      const sort = {
        [sortField]: sortOrder === "asc" ? 1 : -1,
      };

      const pipeline = [
        {
          $addFields: {
            minfair: {
              $cond: [
                { $isNumber: "$minfair" },
                "$minfair",
                { $toDouble: "$minfair" },
              ],
            },
          },
        },
        { $match: match },
        {
          $facet: {
            result: [
              { $sort: sort },
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  _id: 1,
                  tourname: 1,
                  minfair: 1,
                  night: 1,
                  days: 1,
                  places: 1,
                  inclusive: 1,
                  type: 1,
                  image: 1,
                },
              },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ];

      const [data] = await this.aggregate(pipeline);
      return {
        result: data.result,
        total: data.totalCount[0]?.count || 0,
      };
    } catch (err) {
      console.error("Tour.filterTours() error:", err.message);
      throw new Error("Failed to filter tours. Please try again later.");
    }
  };
});

const Tour = mongoose.model("Tour", TourSchema);

export default Tour;
