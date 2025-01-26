import cors from "cors";
import { getHostName } from "../utils/common.js";

const customCors = () => {
  const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((s) =>
    s.trim()
  );

  return (req, res, next) => {
    const host = getHostName(req);

    const corsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigins.includes(host) || !origin) {
          callback(null, true);
        } else {
          console.error(`CORS error: Origin ${origin} is not allowed`);
          callback(new Error("CORS policy violation"));
        }
      },
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders:
        "Accept,Authorization,Content-Type,X-Requested-With,Range",
      exposedHeaders: "Content-Length",
    };

    cors(corsOptions)(req, res, next);
  };
};

export default customCors;
