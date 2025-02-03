import mongoose from "mongoose";

const BusSchema = new mongoose.Schema(
  {
    busNumber: { type: String, required: true, unique: true },
    busType: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    operatorName: { type: String, required: true },
    facilities: { type: [String], default: [] }, // Example: ['WiFi', 'Charging Points']
    isSleeper: { type: Boolean, required: true }, // Sleeper or Non-Sleeper
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

BusSchema.statics.addBus = async function (data) {
  try {
    const bus = new this(data);
    return await bus.save();
  } catch (error) {
    throw new Error("Failed to add bus: " + error.message);
  }
};

BusSchema.statics.updateBus = async function (id, data) {
  try {
    return await this.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (error) {
    throw new Error("Failed to update bus: " + error.message);
  }
};

BusSchema.statics.getAllBuses = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw new Error("Failed to fetch buses: " + error.message);
  }
};

BusSchema.statics.getBusById = async function (id) {
  try {
    return await this.findById(id);
  } catch (error) {
    throw new Error("Failed to get bus details: " + error.message);
  }
};

BusSchema.statics.deleteBus = async function (id) {
  try {
    return await this.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete bus: " + error.message);
  }
};

export default mongoose.model("Bus", BusSchema);
