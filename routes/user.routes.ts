import express from "express";
import controllers from "../controllers/user.controllers";
import rateLimiter from "../middleware/rateLimiter";
import { Schemas, Validate } from "../middleware/joi";
const router = express.Router();

router.post(
  "/user/signup",
  [rateLimiter, Validate(Schemas.user.create)],
  controllers.signUp
);
export = router;
