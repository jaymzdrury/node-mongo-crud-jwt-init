import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Data, { DataModel } from "../models/data.model";
import { ServerError } from "../errors/server-error";
import timer from "../utils/timer";
import logger from "../utils/logger";
const { start, end, responseTime } = timer;

export async function get() {
  start;
  try {
    const data = await Data.find().lean().setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GET: ${responseTime}`);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new ServerError(`GET: ${e.message}`);
    } else {
      throw new ServerError("GET");
    }
  }
}

export async function getOne(query: FilterQuery<DataModel>) {
  start;
  try {
    const data = await Data.findOne({ _id: query })
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GET: ${responseTime}`);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new ServerError(`GET: ${e.message}`);
    } else {
      throw new ServerError("GET");
    }
  }
}

export async function post(input: DataModel) {
  start;
  try {
    const data = await Data.create(input);
    end;
    logger.info(`POST: ${responseTime}`);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new ServerError(`POST: ${e.message}`);
    } else {
      throw new ServerError("POST");
    }
  }
}

export async function put(
  query: FilterQuery<DataModel>,
  update: UpdateQuery<DataModel>,
  options: QueryOptions
) {
  start;
  try {
    const data = await Data.findOneAndUpdate({ _id: query }, update, options)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`PUT: ${responseTime}`);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new ServerError(`PUT: ${e.message}`);
    } else {
      throw new ServerError("PUT");
    }
  }
}

export async function remove(query: FilterQuery<DataModel>) {
  start;
  try {
    const data = await Data.deleteOne({ _id: query })
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`DELETE: ${responseTime}`);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new ServerError(`DELETE: ${e.message}`);
    } else {
      throw new ServerError("DELETE");
    }
  }
}
