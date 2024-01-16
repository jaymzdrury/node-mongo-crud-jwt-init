import express from 'express'
import controllers from '../controllers/data.controllers'
import requireUser from '../middleware/requireUser'
import {Schemas, Validate} from '../middleware/joi'
const router = express.Router()

router.get('/data', controllers.getData)
router.get('/data/:id', controllers.getOneData)
router.post('/data', [requireUser, Validate(Schemas.data.create)], controllers.postData)
router.put('/data/:id', [requireUser, Validate(Schemas.data.create)], controllers.putData)
router.delete('/data/:id', requireUser, controllers.deleteData)

export = router