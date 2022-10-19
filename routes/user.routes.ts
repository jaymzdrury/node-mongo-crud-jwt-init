import express from 'express'
import controllers from '../controllers/user.controllers'
import {Schemas, Validate} from '../middleware/joi'
const router = express.Router()

router.post('/signup', Validate(Schemas.user.create), controllers.signUp)
export = router