import express from "express";
import controllers from "../controllers/data.controllers";
import requireUser from "../middleware/requireUser";
import rateLimiter from "../middleware/rateLimiter";
import { Schemas, Validate } from "../middleware/joi";
const router = express.Router();

router.get("/data", rateLimiter, controllers.getData);
router.get("/data/:id", rateLimiter, controllers.getOneData);
router.post(
  "/data",
  [requireUser, rateLimiter, Validate(Schemas.data.create)],
  controllers.postData
);
router.put(
  "/data/:id",
  [requireUser, rateLimiter, Validate(Schemas.data.create)],
  controllers.putData
);
router.delete("/data/:id", [requireUser, rateLimiter], controllers.deleteData);

export = router;
