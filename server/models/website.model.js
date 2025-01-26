import mongoose from "mongoose";
import { defaultWebsiteData } from "../utils/constant.js";

const GSchema = mongoose.Schema;

const websiteSchema = new GSchema(
  {
    logo: {
      url: String,
      id: String,
    },
    preLogo: {
      url: String,
      id: String,
    },
    emails: {
      infoEmails: [String],
      supportEmail: String,
    },
    contactAddress: {
      city: String,
      state: String,
      pincode: String,
      address1: String,
      address2: String,
    },
    phone: String,
    brandname: String,
    host: [String],
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      phone: String,
    },
  },
  { timestamps: true }
);
websiteSchema.index({ host: 1 });
websiteSchema.plugin(function (schema) {
  schema.statics.save = async function (data) {
    try {
      const doc = new this(data);
      return await doc.save();
    } catch (error) {
      throw new Error("Failed to create wesbite settings: " + error.message);
    }
  };

  schema.statics.updateWebsite = async function (userId, updatedData) {
    try {
      const model = this;
      const updatedDoc = await model.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
      return updatedDoc;
    } catch (error) {
      throw new Error("Failed to update website settings: " + error.message);
    }
  };

  schema.statics.emailsGetInfo = async function (hostname) {
    const model = this;
    try {
      const normalizeUrl = (url) => url.replace(/^https?:\/\//, "").trim();
      const normalizedHostname = normalizeUrl(hostname);
      console.log("normalizedHostname", normalizedHostname);
      const website = await model.findOne({
        host: { $in: [normalizedHostname] },
      });
      console.log("website inside emailsGetInfo");
      return {
        ...defaultWebsiteData,
        ...(website?._doc || {}),
      };
    } catch (error) {
      console.log("Failed to retrieve website data for email controllers");
      throw new Error("Failed to retreive webiste data: " + error.message);
    }
  };

  schema.statics.getInfoById = async function (id) {
    console.log("website model is inside getInfoById");
    try {
      const website = await this.findById(id);
      return website;
    } catch (error) {
      console.log("Website Model: Failed to retrieve website data for id");
      throw new Error("Failed to retreive webiste data: " + error.message);
    }
  };
});

const Website = mongoose.model("website", websiteSchema);
export default Website;
