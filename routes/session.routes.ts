import express from 'express'
import controllers from '../controllers/session.controllers'
import requireUser from '../middleware/requireUser'
import {Schemas, Validate} from '../middleware/joi'
const router = express.Router()

router.get('/', requireUser, controllers.getUser)
router.post('/login', Validate(Schemas.session.create), controllers.login)
router.delete('/logout', requireUser, controllers.logOut)
export = router