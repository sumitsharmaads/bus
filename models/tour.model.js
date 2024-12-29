import mongoose from "mongoose";

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
 */
const GSchema = mongoose.Schema;
const TourSchema = new GSchema(
  {
    source: {
      type: [String],
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    tourname: {
      type: String,
      required: true,
    },
    places: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    stayDescription: [
      {
        nights: { type: Number },
        place: { type: String },
      },
    ],
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bus", // Reference to bus document
    },
    hotel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hotel", // Reference to hotel documents
      },
    ],
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "details", // Reference to details documents
    },
    minfair: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", TourSchema);

export default Tour;
