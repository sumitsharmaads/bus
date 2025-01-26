import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const TokenSchema = new mongoose.Schema(
  {
    token: {
      required: true,
      type: String,
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

TokenSchema.plugin(uniqueValidator, { message: "Token must be unique" });

TokenSchema.statics.addToken = async function (data) {
  try {
    const { token, userId, expiryDate } = data;
    const tokenDoc = new this({
      token,
      userId,
      expiryDate,
    });
    return await tokenDoc.save();
  } catch (error) {
    throw new Error("Failed to save token: " + error.message);
  }
};

TokenSchema.statics.findByToken = async function (token) {
  try {
    const data = await this.findOne({ token: token }).populate(
      "userId",
      "_id fullname email username phone isActive roleType access"
    );
    return data;
  } catch (error) {
    throw new Error("Failed to find by token: " + error.message);
  }
};
TokenSchema.statics.getTokenById = async function (id) {
  try {
    if (!id) {
      throw new Error("Please provide a valid id to get OTP.");
    }
    const tokenData = await this.findById(id)
      .populate(
        "userId",
        "_id fullname email username phone isActive roleType access"
      )
      .exec();
    if (!tokenData) {
      throw new Error("Token not found.");
    }
    return tokenData;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a TTL index to automatically delete OTPs after they expire.
 */
TokenSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

export const Token = mongoose.model("Token", TokenSchema);
