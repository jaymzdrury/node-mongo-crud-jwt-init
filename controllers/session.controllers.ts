import { Request, Response } from "express";
import {postSession, getSessions, updateSession} from "../services/session.services";
import { validatePassword } from "../services/user.services";
import { signJwt } from "../utils/jwt";
import {NotAuthroizedError} from '../errors/not-authorized'
import config from '../config/default'

const login = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);
  if (!user) throw new NotAuthroizedError()
  
  const session = await postSession(user._id, req.get("user-agent") || "")

  const accessToken = signJwt({ ...user, session: session._id},{ expiresIn: config.accessTokenExpires })
  const refreshToken = signJwt({ ...user, session: session._id },{ expiresIn: config.refreshTokenExpires })

  return res.send({ accessToken, refreshToken });
}

const getUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id
  const sessions = await getSessions({ user: userId, valid: true })
  return res.send(sessions);
}

const logOut = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session
  await updateSession({ _id: sessionId }, { valid: false })
  return res.send({accessToken: null, refreshToken: null})
}

export default {login, getUser, logOut}