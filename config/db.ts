import mongoose, { Error as MongoError } from "mongoose";
import logger from "../utils/logger";
import { NotFoundError } from "../errors/not-found";
import { ServerError } from "../errors/server-error";
import { BadRequestError } from "../errors/bad-request";

const db: string | undefined = process.env.URI;

function connectDB() {
  if (!db) throw new NotFoundError("No URI found");
  try {
    mongoose.connect(db);
    const connection = mongoose.connection;
    connection.on("connected", () => logger.info("MongoDB connected"));
    connection.on("error", (err: MongoError) => {
      throw new ServerError(`DB Error: ${err.message}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new BadRequestError(`MongoDB Failed: ${err.message}`);
    } else {
      throw new BadRequestError("MongoDB Failed");
    }
  }
}

export default connectDB;
