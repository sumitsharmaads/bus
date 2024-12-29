import express from "express";
import cookieParser from "cookie-parser";
import EJS from "ejs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import path from "path";
import { fileURLToPath } from "url";

import { currDir } from "./utils/rootDir.js";
import corsMiddleware from "./middlewares/cores.auth.middlewares.js";

import authUserRoutes from "./routes/auth.routes.js";
import publicAuthRoutes from "./routes/public.routes.js";

const __dirname = currDir(import.meta.url);
const app = express();

app.disable("x-powered-by");
app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use(mongoSanitize());
app.use(xssClean());
app.use(compression());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

/**view setup engine */
app.set("views", path.join(__dirname, "views"));
app.engine(".html", EJS.__express);
app.set("view engine", "ejs");

/** Routes */
app.use("/api/v1/auth", corsMiddleware(true), authUserRoutes);
app.use("/api/v1/public", corsMiddleware(false), publicAuthRoutes);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

export { app };
