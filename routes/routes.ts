import express from 'express'
import controllers from '../controllers/controllers'
import {Schemas, Validate} from '../middleware/joi'
const router = express.Router()

router.get('/', controllers.get)
router.get('/:id', controllers.getId)
router.post('/', Validate(Schemas.data.create), controllers.post)
router.patch('/:id', Validate(Schemas.data.update), controllers.updateId)
router.delete('/:id', controllers.deleteId)
export = router