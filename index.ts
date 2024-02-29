import config from "./config/config";
config;

import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import routes from "./routeHandler";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import responseTime from "response-time";
import deserializeUser from "./middleware/desrializeUser";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import { NotFoundError } from "./errors/not-found";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

const options = { origin: process.env.ORIGIN };
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(deserializeUser);
app.use(
  responseTime((req, res, time: number) => {
    if (req?.url) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.url,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.get("/healthcheck", (req, res) => res.sendStatus(200));
routes(app);

app.all("*", async (req, res) => {
  throw new NotFoundError("App not found");
});

startMetricsServer();

const server = app.listen(port, async () => {
  logger.info(`running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Error: ${err}`);
  server.close(() => process.exit(1));
});

export { app };
