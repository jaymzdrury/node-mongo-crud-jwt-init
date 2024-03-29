import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 403 });
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
