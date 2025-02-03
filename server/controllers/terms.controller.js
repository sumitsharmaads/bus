import Terms from "../models/terms.model.js";

export const getTerms = async (req, res) => {
  try {
    const terms = await Terms.getAll();
    res.status(200).json({ success: true, data: terms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addOrUpdateTerms = async (req, res) => {
  try {
    const updatedTerms = await Terms.addOrUpdate(req.body);
    res.status(200).json({
      success: true,
      message: "Terms updated successfully",
      data: updatedTerms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
