import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    questions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

FAQSchema.statics.addOrUpdate = async function (data) {
  try {
    const existingFAQs = await this.findOne();
    if (existingFAQs) {
      existingFAQs.questions = data.questions;
      return await existingFAQs.save();
    } else {
      const newFAQs = new this(data);
      return await newFAQs.save();
    }
  } catch (error) {
    throw new Error("Failed to save FAQs: " + error.message);
  }
};

FAQSchema.statics.getAll = async function () {
  try {
    return await this.findOne();
  } catch (error) {
    throw new Error("Failed to fetch FAQs: " + error.message);
  }
};

export default mongoose.model("FAQs", FAQSchema);
