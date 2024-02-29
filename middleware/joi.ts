import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import escapeHTML from "escape-html";
import { UserModel } from "../models/interfaces";
import { DataModel } from "../models/data.model";
import { BadRequestError } from "../errors/bad-request";

export const Validate = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      throw new BadRequestError(`Validation failed: ${err}`);
    }
  };
};

const SafeJoi = Joi.extend((joi) => {
  return {
    type: "string",
    base: joi.string(),
    rules: {
      escapeHTML: {
        validate(value) {
          return escapeHTML(value);
        },
      },
    },
  };
});

export const Schemas = {
  user: {
    create: Joi.object<UserModel>({
      email: SafeJoi.string().email().escapeHTML().required(),
      name: SafeJoi.string().escapeHTML().required(),
      password: SafeJoi.string().min(6).escapeHTML().required(),
    }),
  },
  session: {
    create: Joi.object<UserModel>({
      email: SafeJoi.string().email().escapeHTML().required(),
      password: SafeJoi.string().escapeHTML().required(),
    }),
  },
  data: {
    create: Joi.object<DataModel>({
      data: SafeJoi.string().min(2).escapeHTML().required(),
    }),
  },
};
