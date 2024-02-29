import { Request, Response } from "express";
import { omit } from "lodash";
import { signUpUser } from "../services/user.services";
import timeoutHandler from "../utils/timeout";

const signUp = async (req: Request, res: Response) => {
  timeoutHandler(req, res);
  const user = await signUpUser(req.body);
  return res.send(omit(user, "password"));
};

export default { signUp };
