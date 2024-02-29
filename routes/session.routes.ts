import express from "express";
import controllers from "../controllers/session.controllers";
import requireUser from "../middleware/requireUser";
import rateLimiter from "../middleware/rateLimiter";
import { Schemas, Validate } from "../middleware/joi";
const router = express.Router();

router.get("/user/sessions", requireUser, controllers.getUser);
router.post(
  "/user/login",
  [rateLimiter, Validate(Schemas.session.create)],
  controllers.login
);
router.delete("/user/logout", requireUser, controllers.logOut);
export = router;
