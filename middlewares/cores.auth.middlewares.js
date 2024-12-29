import cors from "cors";

const customCors = (credentialsRequired) => {
  return (req, res, next) => {
    const corsOptions = {
      origin: process.env.CORS_ORIGIN,
      credentials: credentialsRequired,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders:
        "Accept, Authorization, Content-Type, X-Requested-With, Range",
      exposedHeaders: "Content-Length",
    };
    cors(corsOptions)(req, res, next);
  };
};

export default customCors;
