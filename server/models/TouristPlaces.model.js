const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * @typedef {Object} ISection
 * @property {string} title - Section title.
 * @property {string} titleMain - Main title of the section.
 * @property {string} details - HTML content of the section.
 * @property {number} priority - Priority of the section.
 * @property {string} heading - Heading of the section.
 * @property {string} keywords - Keywords related to the section.
 * @property {string} metatags - Meta tags for SEO.
 */
const SectionSchema = new Schema({
  title: { type: String, required: true },
  titleMain: { type: String, required: true },
  details: { type: String, required: true },
  priority: { type: Number, required: true },
  heading: { type: String, required: true },
  keywords: { type: String, required: true },
  metatags: { type: String, required: true },
});

/**
 * @typedef {Object} ITouristPlace
 * @property {string} placeName - Name of the tourist place.
 * @property {string} description - description.
 * @property {string} shortDescription - Short description (max 200 chars).
 * @property {string} city - City where the place is located.
 * @property {string} state - State where the place is located.
 * @property {string[]} type - Categories like "devotion", "adventure", etc.
 * @property {string} image - URL of the place image.
 * @property {string[]} nearbyPlaces - List of nearby city names.
 * @property {ISection[]} sections - Dynamic sections containing details.
 */
const TouristPlaceSchema = new Schema(
  {
    placeName: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    city: { type: String, required: true },
    state: { type: String, required: true },
    type: {
      type: [String],
      enum: ["devotion", "budget friendly", "adventure", "family", "group"],
      required: true,
    },
    image: { type: String, required: true },
    nearbyPlaces: { type: [String], default: [] },
    sections: [SectionSchema],
  },
  { timestamps: true }
);

TouristPlaceSchema.index({ placeName: 1, city: 1, state: 1 });

/**
 * Static Methods
 */

// **Save a new place**
TouristPlaceSchema.statics.saveDetails = async function (data) {
  try {
    const newPlace = new this(data);
    await newPlace.save();
    return newPlace;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get place by ID
TouristPlaceSchema.statics.getInfo = async function (id) {
  return this.findById(id);
};

// Get sections info
TouristPlaceSchema.statics.getSectionsInfo = async function (id) {
  const place = await this.findById(id).select("sections");
  return place ? place.sections : null;
};

// Update place info
TouristPlaceSchema.statics.updateInfo = async function (id, data) {
  return this.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Update a specific section in a place
TouristPlaceSchema.statics.updateSectionInfo = async function (
  id,
  sectionId,
  sectionData
) {
  return this.findOneAndUpdate(
    { _id: id, "sections._id": sectionId },
    { $set: { "sections.$": sectionData } },
    { new: true, runValidators: true }
  );
};

// Get all places with filters, pagination, and search
TouristPlaceSchema.statics.getAll = async function ({
  page = 1,
  limit = 10,
  search = "",
  city,
  state,
}) {
  const query = {};

  if (search) {
    query.$or = [
      { placeName: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  if (city) query.city = city;
  if (state) query.state = state;

  const places = await this.find(query)
    .select("placeName shortDescription city state image")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const total = await this.countDocuments(query);

  return { places, total, page, limit };
};

// Delete place
TouristPlaceSchema.statics.deleteInfo = async function (id) {
  return this.findByIdAndDelete(id);
};

// Delete a specific section from a place
TouristPlaceSchema.statics.deleteSection = async function (id, sectionId) {
  return this.findByIdAndUpdate(
    id,
    { $pull: { sections: { _id: sectionId } } },
    { new: true }
  );
};

/**
 * Plugin for additional enhancements
 */
TouristPlaceSchema.plugin(function (schema) {
  schema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
  };
});

const TouristPlace = mongoose.model("TouristPlace", TouristPlaceSchema);

export default TouristPlace;
