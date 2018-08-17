
import {Router} from 'express'

import createController from './create.controller'
import deleteController from './delete.controller'
import readController from './read.controller'
import updateController from './update.controller'
import authMiddleware from "../../../middlewares/auth"
const router = Router()

router.get('/:num', authMiddleware, readController)
router.put('/:num', authMiddleware, updateController)
router.post('/', authMiddleware, createController)
router.delete('/:num',authMiddleware, deleteController)

module.exports = router

