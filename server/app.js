import express from "express";
import cookieParser from "cookie-parser";
import EJS from "ejs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import path from "path";

import { currDir } from "./utils/rootDir.js";

import authUserRoutes from "./routes/auth.routes.js";
import publicAuthRoutes from "./routes/public.routes.js";
import placesRoutes from "./routes/places.routes.js";
import imagesRoutes from "./routes/images.routes.js";
import userRoutes from "./routes/user.routes.js";
import websiteRoutes from "./routes/website.routes.js";
import tourRoutes from "./routes/tour.routes.js";

import customCors from "./middlewares/cores.auth.middlewares.js";

const __dirname = currDir(import.meta.url);
const app = express();

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: true,
  })
);
app.use(mongoSanitize());
app.use(xssClean());
app.use(compression());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
//app.set("trust proxy", true);
app.use(express.static(path.join(__dirname, "serverPublic")));
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use(customCors());

/**view setup engine */
app.set("views", path.join(__dirname, "views"));
app.engine(".html", EJS.__express);
app.set("view engine", "ejs");

/** Routes */
app.use("/api/v1/auth", authUserRoutes);
app.use("/api/v1/forms", publicAuthRoutes);
app.use("/api/v1/places", placesRoutes);
app.use("/api/v1/images", imagesRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/config", websiteRoutes);
app.use("/api/v1/tours", tourRoutes);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API not found" });
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export { app };
