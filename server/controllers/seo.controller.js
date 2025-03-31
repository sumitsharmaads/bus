import SEOModel from "../models/seo.model.js";
import { createError } from "../utils/error.js";

export const getSEOByRoute = async (req, res, next) => {
  try {
    const { path } = req.query;
    if (!path)
      return res
        .status(400)
        .json({ success: false, message: "Route path is required." });
    const decodePath = decodeURIComponent(path);
    const seo = await SEOModel.findOne({ route: decodePath });
    res.json({ success: true, data: seo });
  } catch (error) {
    return next(createError(500, error));
  }
};

export const createOrUpdateSEO = async (req, res, next) => {
  try {
    const { route, title, description, keywords, canonical, image, url } =
      req.body;
    if (!route || !title)
      return res
        .status(400)
        .json({ success: false, message: "Route and title are required." });

    const existing = await SEOModel.findOne({ route });
    const data = { title, description, keywords, canonical, image, url };

    let result;
    if (existing) {
      result = await SEOModel.EditSEO(route, data);
    } else {
      result = await SEOModel.addSEO({ route, ...data });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("[createOrUpdateSEO]", error);
    next(error);
  }
};

export const deleteSEO = async (req, res, next) => {
  try {
    const { route } = req.params;
    if (!route)
      return res
        .status(400)
        .json({ success: false, message: "Route is required." });

    const result = await SEOModel.DeleteSEO(route);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "SEO entry not found." });

    res.json({ success: true, message: "SEO entry deleted." });
  } catch (error) {
    console.error("[deleteSEO]", error);
    next(error);
  }
};

export const getAllSEOs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filterRoute = req.query.route
      ? decodeURIComponent(req.query.route)
      : "";
    console.log("filterRoute", filterRoute);
    const result = await SEOModel.getALL(page, limit, filterRoute);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("[getAllSEOs]", error);
    next(error);
  }
};

export const getSEOById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "ID is required." });

    const seo = await SEOModel.getSeosById(id);
    if (!seo)
      return res
        .status(404)
        .json({ success: false, message: "SEO entry not found." });

    res.status(200).json({ success: true, data: seo });
  } catch (error) {
    console.error("[getSEOById]", error);
    next(error);
  }
};

export const updateSEOById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data)
      return res.status(400).json({
        success: false,
        message: "ID and update data are required.",
      });

    const updated = await SEOModel.updateSEOById(id, data);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("[updateSEOById]", error);
    next(error);
  }
};
