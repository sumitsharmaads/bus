import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const SEOSchema = new mongoose.Schema(
  {
    route: { type: String, required: true, unique: true },
    title: { type: String },
    description: { type: String },
    keywords: { type: String },
    canonical: { type: String },
    image: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

SEOSchema.plugin(uniqueValidator, { message: "Routes must be unique" });

SEOSchema.statics.addSEO = async function (data) {
  try {
    const seo = new this(data);
    return await seo.save();
  } catch (error) {
    console.error("[addSEO] Error adding SEO:", error);
    throw new Error("Failed to add SEO metadata.");
  }
};

SEOSchema.statics.editSEO = async function (route, data) {
  try {
    const updated = await this.findOneAndUpdate({ route }, data, { new: true });
    if (!updated) throw new Error("SEO entry not found to update.");
    return updated;
  } catch (error) {
    console.error("[EditSEO] Error updating SEO:", error);
    throw new Error("Failed to update SEO metadata.");
  }
};

SEOSchema.statics.deleteSEO = async function (route) {
  try {
    const deleted = await this.findOneAndDelete({ route });
    if (!deleted) throw new Error("SEO entry not found to delete.");
    return deleted;
  } catch (error) {
    console.error("[DeleteSEO] Error deleting SEO:", error);
    throw new Error("Failed to delete SEO metadata.");
  }
};

SEOSchema.statics.getSeosById = async function (id) {
  try {
    const seo = await this.findById(id);
    if (!seo) throw new Error("SEO entry not found.");
    return seo;
  } catch (error) {
    console.error("[getById] Error fetching SEO by ID:", error);
    throw new Error("Failed to fetch SEO by ID.");
  }
};

SEOSchema.statics.updateSEOById = async function (id, data) {
  try {
    const updated = await this.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("SEO entry not found to update by ID.");
    return updated;
  } catch (error) {
    console.error("[updateSEOById] Error updating SEO by ID:", error);
    throw new Error("Failed to update SEO metadata by ID.");
  }
};

SEOSchema.statics.getALL = async function (
  page = 1,
  limit = 10,
  filterRoute = ""
) {
  try {
    const skip = (page - 1) * limit;
    const query = filterRoute
      ? { route: { $regex: new RegExp(filterRoute, "i") } }
      : {};
    const data = await this.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await this.countDocuments(query);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  } catch (error) {
    console.error("[GetALL] Error fetching SEO data:", error);
    throw new Error("Failed to fetch SEO data.");
  }
};

export default mongoose.model("SEO", SEOSchema);
