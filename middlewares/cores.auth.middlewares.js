import cors from "cors";
import { getHostName } from "../utils/common.js";

const customCors = (credentialsRequired) => {
  console.log("customcors", credentialsRequired);
  const allowedOrigin = process.env.CORS_ORIGIN.toString()
    .split(",")
    .map((s) => s.trim());
  return (req, res, next) => {
    const host = getHostName(req);
    console.log("host", host);
    const corsOptions = {
      origin: (origin, callback) => {
        console.log("origin", origin);
        if (allowedOrigin.indexOf(host) !== -1 || !host) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders:
        "Accept, Authorization, Content-Type, X-Requested-With, Range",
      exposedHeaders: "Content-Length",
    };
    cors(corsOptions)(req, res, next);
  };
};

export default customCors;
