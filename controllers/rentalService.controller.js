import EmailUtil from "../utils/EmailUtil.js";
import { createError } from "../utils/error.js";
import Message from "../models/message.model.js";

export const localServiceController = async (req, res, next) => {
  const {
    source,
    purpose,
    travelDate,
    firstname,
    lastname,
    email,
    phone,
    message,
  } = req.body;
  if (!source || !purpose || !travelDate || !firstname || !lastname || !phone) {
    console.log("localServiceController: Invalid req data");
    return next(createError(400, "Please provide all mandatory fields"));
  }
  try {
    const emailSend = await EmailUtil.sendEmailWithTemplate(
      "skworrier@gmail.com",
      "New Local Bus Service Request",
      {
        data: {
          source,
          purpose,
          travelDate,
          firstname,
          lastname,
          email: email || "",
          phone,
          message: message || "",
        },
        req,
        template: "local_bus_rental_template.html",
      }
    );
    if (!emailSend) {
      console.log("Error: Failed to send rental local bus email");
      return next(
        createError(500, "Failed to send an email. Please try again.")
      );
    }
    await Message.addMessage({
      subject: "New Local Bus Service Request",
      email: email,
      name: `${firstname} ${lastname}`,
      phone,
      message,
      data: { travelDate, source, purpose },
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message:
        "Your request has been received! We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Error during local service handler:", error);
    return next(
      createError(500, "Internal server error. Please try again later.")
    );
  }
};

export const outStationServiceController = async (req, res, next) => {
  const {
    source,
    purpose,
    travelDate,
    firstname,
    lastname,
    phone,
    message,
    tour,
    destination,
    returnDate,
  } = req.body;
  if (
    !source ||
    !purpose ||
    !travelDate ||
    !firstname ||
    !lastname ||
    !phone ||
    !destination ||
    !tour
  ) {
    console.log("localServiceController: Invalid req data");
    return next(createError(400, "Please provide all mandatory fields"));
  }
  try {
    const emailSend = await EmailUtil.sendEmailWithTemplate(
      "skworrier@gmail.com",
      "New Outstation Tour Service Request",
      {
        data: req.body,
        req,
        template: "outstation_bus_rental_template.html",
      }
    );
    if (!emailSend) {
      console.log("Error: Failed to send rental local bus email");
      return next(
        createError(500, "Failed to send an email. Please try again.")
      );
    }
    await Message.addMessage({
      subject: "New Outstation Tour Service Request",
      email: "skworrier@gmail.com",
      name: `${firstname} ${lastname}`,
      phone,
      message,
      data: { travelDate, source, purpose, destination, returnDate, tour },
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message:
        "Your request has been received! We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Error during outstation service handler:", error);
    return next(
      createError(500, "Internal server error. Please try again later.")
    );
  }
};
