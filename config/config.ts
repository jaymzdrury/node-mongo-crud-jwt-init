import dotenv from "dotenv";
import joi from "joi";
import path from "path";
import { ServerError } from "../errors/server-error";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchema = joi
  .object()
  .keys({
    KEY: joi.string().required(),
    URI: joi.string().required(),
    ORIGIN: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new ServerError(`No ENV: ${error.message}`);
}

export default { key: envVars.KEY, uri: envVars.URI, origin: envVars.ORIGIN };
