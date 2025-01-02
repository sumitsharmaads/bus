import EmailUtil from "../utils/EmailUtil.js";
import { createError } from "../utils/error.js";
import Message from "../models/message.model.js";

export const contactHandler = async (req, res, next) => {
  console.log("Controller: inside contactHandler");
  console.log("website info", req.website);
  const contactEmails = req.website.contactEmail;
  const { firstname, lastname, email, phone, message } = req.body;

  // Validate if all required fields are provided
  if (!firstname || !lastname || !email || !phone || !message) {
    console.log("contactHandler: Invalid req data");
    return next(createError(400, "Please provide all mandatory fields"));
  }

  try {
    // Send contact message email to support
    const emailSend = await EmailUtil.sendEmailWithTemplate(
      contactEmails, // Support email
      "New Contact Message", // Subject of the email
      {
        data: {
          firstname,
          lastname,
          email,
          phone,
          message,
          ...(req.website || {}),
        },
        req,
        template: "contact_template.html", // Path to the contact template
      }
    );

    // Check if the email was successfully sent
    if (!emailSend) {
      console.log("Error: Failed to send contact email");
      return next(
        createError(500, "Failed to send an email. Please try again.")
      );
    }

    // Save the message to the database (or other storage)
    await Message.addMessage({
      subject: "New Contact Message",
      email: "skworrier@gmail.com", // Target email (support)
      name: `${firstname} ${lastname}`,
      phone,
      message,
    });

    // Respond to the client indicating success
    return res.status(200).json({
      success: true,
      status: 200,
      message:
        "Your message has been sent to support! We will get back to you shortly.",
    });
  } catch (error) {
    // Log the error and send an error response
    console.error("Error during contact handler:", error);
    return next(
      createError(500, "Internal server error. Please try again later.")
    );
  }
};

export const inqueryHandler = async (req, res, next) => {
  console.log("Controller: inside inqueryHandler");
  const inqueryEmail = req.website.inqueryEmail;
  const { name, email, inquery } = req.body;

  // Validate if all required fields are provided
  if (!name || !email || !inquery) {
    console.log("inqueryHandler: Invalid request data");
    return next(
      createError(
        400,
        "Please provide all mandatory fields (name, email, and inquiry)."
      )
    );
  }

  try {
    // Send inquiry email to support
    const emailSent = await EmailUtil.sendEmailWithTemplate(
      inqueryEmail, // Support email
      "New Inquiry Received", // Subject of the email
      {
        data: {
          name,
          email,
          inquery,
          ...(req.website || {}),
        },
        req,
        template: "inquery_template.html",
      }
    );

    if (!emailSent) {
      console.log("Error: Failed to send inquiry email");
      return next(
        createError(500, "Failed to send your inquiry. Please try again later.")
      );
    }

    // Optionally save the inquiry message (e.g., in a database or message system)
    await Message.addMessage({
      subject: "New Inquiry Message",
      email,
      name,
      message: inquery,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message:
        "Thank you for your inquiry! Our support team will get back to you shortly.",
    });
  } catch (error) {
    console.error("Error in inquiryHandler:", error);
    return next(
      createError(500, "Internal server error. Please try again later.")
    );
  }
};
