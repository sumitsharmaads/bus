import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import ejs from "ejs";
import FS from "fs";
import Path from "path";
import { fileURLToPath } from "url";
import { getHostName } from "./common.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

async function sendEmail(mailOptions, cb) {
  return new Promise((resolve, reject) => {
    if (!mailOptions.to || !mailOptions.subject) {
      return reject("Provide valid data.");
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return reject(error);
      }
      return resolve(info);
    });
  });
}
const GTemplateRelationPath = "../views";
const EmailUtil = {
  sendEmailWithText: function (to, subject, otherOptions = {}) {
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to,
      subject,
      text: otherOptions?.text,
    };
    return sendEmail(mailOptions);
  },
  sendEmailWithTemplate: async function (to, subject, otherOptions = {}) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = Path.dirname(__filename);
    const template = otherOptions?.template;
    const templateData = otherOptions?.data;
    templateData.host = getHostName(otherOptions.req);
    console.log("otherOptions?.data", otherOptions?.data);
    let templateEmailHtml = FS.readFileSync(
      Path.join(__dirname, GTemplateRelationPath, template),
      "utf8"
    );
    const emailCotent = ejs.compile(templateEmailHtml)(templateData);
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to,
      subject,
      html: emailCotent,
    };
    return sendEmail(mailOptions);
  },
  sendEmailWithAttachment: function (to, subject, otherOptions = {}) {},
};

export default EmailUtil;
