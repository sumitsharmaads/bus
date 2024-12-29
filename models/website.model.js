import mongoose from "mongoose";

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
    contactEmail: [String],
    rentalEmail: [String],
    inqueryEmail: [String],
    contactAddress: {
      city: String,
      state: String,
      pincode: String,
      address1: String,
    },
    phone: String,
    supportEmail: String,
    brandname: String,
  },
  { timestamps: true }
);

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
});

const Website = mongoose.model("website", websiteSchema);
export default Website;
