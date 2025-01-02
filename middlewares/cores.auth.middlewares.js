import cors from "cors";
import { getHostName } from "../utils/common.js";

const customCors = () => {
  const allowedOrigin = process.env.CORS_ORIGIN.toString()
    .split(",")
    .map((s) => s.trim());
  return (req, res, next) => {
    const host = getHostName(req);
    const corsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigin.indexOf(host || origin) !== -1 || !host) {
          callback(null, true);
        } else {
          console.log("not allowed due to cors policy");
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
