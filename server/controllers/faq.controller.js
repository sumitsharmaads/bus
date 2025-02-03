import FAQs from "../models/faq.model.js";

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQs.getAll();
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addOrUpdateFAQs = async (req, res) => {
  try {
    const updatedFAQs = await FAQs.addOrUpdate(req.body);
    res.status(200).json({
      success: true,
      message: "FAQs updated successfully",
      data: updatedFAQs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
