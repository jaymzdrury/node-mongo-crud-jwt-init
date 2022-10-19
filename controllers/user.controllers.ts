import {Request, Response} from 'express'
import {omit} from 'lodash'
import {signUpUser} from '../services/user.services'

const signUp = async (req: Request, res: Response) => {
    const user = await signUpUser(req.body)
    return res.send(omit(user,"password"))
}

export default {signUp}