import mongoose from "mongoose";

const TermSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

TermSchema.statics.addOrUpdate = async function (data) {
  try {
    const existingTerms = await this.findOne();
    if (existingTerms) {
      existingTerms.text = data.text;
      return await existingTerms.save();
    } else {
      const newTerms = new this(data);
      return await newTerms.save();
    }
  } catch (error) {
    throw new Error("Failed to save Terms & Conditions: " + error.message);
  }
};

TermSchema.statics.getAll = async function () {
  try {
    return await this.findOne();
  } catch (error) {
    throw new Error("Failed to fetch Terms & Conditions: " + error.message);
  }
};

export default mongoose.model("Terms", TermSchema);
