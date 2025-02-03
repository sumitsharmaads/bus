import Bus from "../models/bus.model.js";

export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.getAllBuses();
    res.status(200).json({ success: true, buses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBus = async (req, res) => {
  try {
    const bus = await Bus.getBusById(req.params.id);
    if (!bus)
      return res.status(404).json({ success: false, message: "Bus not found" });
    res.status(200).json({ success: true, bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addBus = async (req, res) => {
  try {
    const newBus = await Bus.addBus(req.body);
    res
      .status(201)
      .json({ success: true, message: "Bus added successfully", newBus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.updateBus(req.params.id, req.body);
    if (!updatedBus)
      return res.status(404).json({ success: false, message: "Bus not found" });
    res
      .status(200)
      .json({ success: true, message: "Bus updated successfully", updatedBus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.deleteBus(req.params.id);
    if (!deletedBus)
      return res.status(404).json({ success: false, message: "Bus not found" });
    res
      .status(200)
      .json({ success: true, message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
