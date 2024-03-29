import { omit } from "lodash";
import { FilterQuery } from "mongoose";
import { UserModel, UserInput } from "../models/interfaces";
import User from "../models/user.model";
import timer from "../utils/timer";
import logger from "../utils/logger";
import { ServerError } from "../errors/server-error";
const { start, end, responseTime } = timer;

export async function getUser(query: FilterQuery<UserModel>) {
  start;
  try {
    const result = await User.findOne(query)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GETID: ${responseTime}`);
    return result;
  } catch (e: any) {
    if (e instanceof Error) {
      throw new ServerError(`GETID: ${e.message}`);
    } else {
      throw new ServerError("GETID");
    }
  }
}

export async function signUpUser(input: UserInput) {
  start;
  try {
    const user = await User.create(input);
    end;
    logger.info(`SIGN UP: ${responseTime}`);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    if (e instanceof Error) {
      throw new ServerError(`SIGN UP: ${e.message}`);
    } else {
      throw new ServerError("SIGN UP");
    }
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  start;
  try {
    const user = await User.findOne({ email }).setOptions({
      sanitizeFilter: true,
    });

    if (!user) return false;
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    end;
    logger.info(`VALIDATE: ${responseTime}`);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    if (e instanceof Error) {
      throw new ServerError(`VALIDATE: ${e.message}`);
    } else {
      throw new ServerError("VALIDATE");
    }
  }
}
