import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import Common from "../utils/common.js";

/**
 * User schema representing the user data structure.
 *
 * RoleType:
 *  - 0: Admin
 *  - 1: Normal User
 *  - 2: Captain
 *
 * Access types:
 *  - -1: Frozen
 *  - 0: Active
 *  - 1: Awaiting email activation
 *  - 2: Requires password reset
 */

const GSchema = mongoose.Schema;
const UserSchema = new GSchema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      //match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    phone: {
      type: Number,
      max: 9999999999,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdByAdmin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: { type: Boolean, default: false },
    roleType: {
      type: Number,
      enum: [0, 1, 2],
      default: 1,
    },
    access: { type: Number, enum: [-1, 0, 1, 2], default: 1 },
    isAdmin: Boolean,
    loginOTP: {
      token: String,
      otpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Otp",
      },
    },
    forgotPasswordOTP: {
      token: String,
      otpid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Otp",
      },
    },
    loginTime: { type: Date, default: Date.now },
    logs: [
      {
        user: {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          updateDate: Date,
          updation: [String],
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken" });
UserSchema.plugin(function (schema) {
  /**
   * Pre-save middleware to hash the password before saving the user.
   *
   * @param {function} next - The next middleware function to call.
   */
  schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
      console.log("pre save user");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

  /**
   * Method to check if the provided password matches the user's password.
   *
   * @param {string} password - The password to compare with the stored password.
   * @returns {Promise<boolean>} - Resolves to true if the passwords match, false otherwise.
   */
  schema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  /**
   * Static method to validate password strength based on specific rules.
   *
   * @param {string} password - The password to validate.
   * @returns {boolean} - Returns true if the password meets the complexity requirements, otherwise false.
   */
  schema.statics.validatePassword = function (password) {
    const tempPassword = password?.toString()?.trim();
    const regex = {
      capitalLetter: /[A-Z]/,
      smallLetter: /[a-z]/,
      numeric: /[0-9]/,
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
    };
    if (tempPassword?.length < 10 || tempPassword?.length > 15) {
      return false;
    }
    if (
      !regex.capitalLetter.test(tempPassword) ||
      !regex.smallLetter.test(tempPassword) ||
      !regex.numeric.test(tempPassword) ||
      !regex.specialCharacter.test(tempPassword)
    ) {
      console.log("password failed");
      return false;
    }
    return true;
  };

  /**
   * @typedef {import('mongoose').Model} Model
   */

  /**
   * Static method to get user information by specific condition.
   *
   * @param {Object} condition - The condition used to find the user.
   * @param {Object} [projection] - The fields to include or exclude in the result.
   * @returns {Promise<Object>} - Resolves to the found user object.
   * @throws {Error} - If the user is not found.
   */
  schema.statics.getInfo = async function (condition, projection) {
    /** @type {Model} */
    const model = this;
    try {
      const user = await model.findOne(condition).select(projection || {});
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  };

  /**
   * Static method to delete a user by ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<Object>} - Resolves to the result of the delete operation.
   * @throws {Error} - If the deletion fails.
   */
  schema.statics.deleteById = async function (id) {
    /** @type {Model} */
    const model = this;
    try {
      return await model.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  };

  /**
   * Static method to update user information.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {Object} updatedData - The data to update the user with.
   * @param {Object} [projection] - The fields to include or exclude in the result.
   * @returns {Promise<Object>} - Resolves to the updated user object.
   * @throws {Error} - If the update fails.
   */
  schema.statics.updateUser = async function (userId, updatedData, projection) {
    /** @type {Model} */
    const model = this;
    try {
      const updatedUser = await model
        .findByIdAndUpdate(userId, updatedData, {
          new: true,
        })
        .select(projection || {});
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  };

  /**
   * Static method to register a new user.
   *
   * @param {Object} userData - The user data to register.
   * @returns {Promise<Object>} - Resolves to the newly created user object.
   * @throws {Error} - If the user already exists or the registration fails.
   */
  schema.statics.register = async function (userData) {
    const { email, username, password } = userData;
    const model = this;
    if (!model.validatePassword(password)) {
      console.log("password does not match");
      throw new Error("Password does not meet complexity requirements.");
    }
    try {
      const existingUser = await this.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        console.log("existing user");
        throw new Error("Email or Username is already taken.");
      }
      const user = new this(userData);
      await user.save();
      return user;
    } catch (error) {
      console.log("errpr 23", error);
      throw new Error(error.message ?? "Failed to save user", error);
    }
  };

  /**
   * Static method to get all users with various filters.
   *
   * @param {Object} condition - The condition object containing various filters.
   * @param {boolean} countFlagOnly - Flag to return only count of users.
   * @returns {Promise<Object>} - Resolves to an object containing the count and the user result.
   * @throws {Error} - If the query fails.
   */
  schema.statics.getAll = async function (condition, countFlagOnly) {
    /** @type {Model} */
    const model = this;
    const {
      isCount,
      search,
      roleTypes,
      access,
      page = 1,
      items = 10000,
      sort = { createAt: -1 },
      timeRangeName = "createAt",
      startDate,
      endDate,
    } = condition || {};
    const tempCondition = {};
    if (!Common.isNullOrEmpty(search)) {
      const filters = [];
      for (const key in search) {
        filters.push({ [key]: { $regex: new RegExp(search[key], "i") } });
      }
      tempCondition.$or = filters;
    }
    if (roleTypes) {
      tempCondition.roleType = Array.isArray(roleTypes)
        ? { $in: roleTypes }
        : roleTypes;
    }
    if (access) {
      tempCondition.access = Array.isArray(access) ? { $in: access } : access;
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
          users: result,
        };
      } else {
        const result = await model
          .find(tempCondition)
          .limit(items)
          .skip((page - 1) * items)
          .sort(sort);
        return {
          count: null,
          users: result,
        };
      }
    } catch (error) {
      throw new Error(`Failed to retrieve users: ${error.message}`);
    }
  };

  schema.statics.changePassword = async function (
    uid,
    oldPassword,
    newPassword
  ) {
    let self = this;
    let query = self
      .findOne({ _id: uid })
      .select("_id username email password");

    try {
      const user = await query.exec();

      if (!user) {
        throw new Error("User not found");
      }

      const isOldPasswordCorrect = await user.isCorrectPassword(oldPassword);

      if (!isOldPasswordCorrect) {
        throw new Error("Old password is incorrect");
      }

      if (!self.validatePassword(newPassword)) {
        throw new Error("New password does not meet complexity requirements");
      }

      //const salt = await bcrypt.genSalt(10);
      //const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      user.password = newPassword;
      //user.loginTime = Date.now();
      await user.save();

      return {
        message: "Password successfully changed",
        userId: user._id,
      };
    } catch (error) {
      throw new Error(`Failed to change password: ${error.message}`);
    }
  };

  schema.statics.resetPassword = async function (uid, password) {
    let self = this;
    let query = self
      .findOne({ _id: uid })
      .select("_id username email password");

    try {
      const user = await query.exec();

      if (!user) {
        throw new Error("User not found");
      }

      if (!self.validatePassword(password)) {
        throw new Error("New password does not meet complexity requirements");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(password, salt);

      user.password = hashedNewPassword;
      await user.save();

      return {
        message: "Password successfully changed",
        userId: user._id,
      };
    } catch (error) {
      throw new Error(`Failed to change password: ${error.message}`);
    }
  };
});

const User = mongoose.model("users", UserSchema);
export default User;
