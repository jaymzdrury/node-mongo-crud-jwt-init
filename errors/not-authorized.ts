import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class NotAuthroizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 401 });
    Object.setPrototypeOf(this, NotAuthroizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
