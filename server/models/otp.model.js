import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

/**
 * OTP Schema for storing one-time passwords for users.
 *
 * @typedef {Object} OtpDocument
 * @property {string} otp - The OTP string (must be exactly 6 characters).
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user associated with the OTP.
 * @property {Date} expiryDate - The date when the OTP expires.
 * @property {Date} createdAt - The timestamp when the OTP was created (auto-generated).
 * @property {Date} updatedAt - The timestamp when the OTP was last updated (auto-generated).
 */
const OtpSchema = new mongoose.Schema(
  {
    otp: {
      required: true,
      type: String,
      minlength: [6, "OTP must be 6 characters long"],
      maxlength: [6, "OTP must be 6 characters long"],
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Ensures OTP uniqueness
OtpSchema.plugin(uniqueValidator, { message: "OTP must be unique" });

/**
 * Static method to add an OTP to the database.
 *
 * @param {Object} otpData - The OTP data object containing `otp`, `userId`, and `expiryDate`.
 * @param {string} otpData.otp - The OTP string (must be exactly 6 characters).
 * @param {mongoose.Schema.Types.ObjectId} otpData.userId - The ID of the user associated with the OTP.
 * @param {Date} otpData.expiryDate - The expiry date of the OTP.
 * @returns {Promise<OtpDocument>} The saved OTP document.
 * @throws {Error} If OTP saving fails.
 */
OtpSchema.statics.addOtp = async function (otpData) {
  try {
    const { otp, userId, expiryDate } = otpData;
    const otpDoc = new this({
      otp,
      userId,
      expiryDate,
    });
    return await otpDoc.save();
  } catch (error) {
    throw new Error("Failed to save OTP: " + error.message);
  }
};

/**
 * Static method to get an OTP document by its ID.
 *
 * @param {mongoose.Schema.Types.ObjectId} id - The ID of the OTP document to retrieve.
 * @returns {Promise<OtpDocument>} The OTP document with user details populated.
 * @throws {Error} If OTP retrieval fails or invalid ID is provided.
 */
OtpSchema.statics.getOtpById = async function (id) {
  try {
    if (!id) {
      throw new Error("Please provide a valid id to get OTP.");
    }
    const otpData = await this.findById(id)
      .populate(
        "userId",
        "_id fullname email username phone isActive roleType access"
      )
      .exec();
    if (!otpData) {
      throw new Error("OTP not found.");
    }
    return otpData;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a TTL index to automatically delete OTPs after they expire.
 */
OtpSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model("Otp", OtpSchema);
