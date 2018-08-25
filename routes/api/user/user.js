
import {Router} from 'express'

import deleteController from './delete.controller'
import updateController from './update.controller'
import authMiddleware from '../../../middlewares/auth'
const router = Router()

router.put('/', authMiddleware, updateController)
router.delete('/', authMiddleware, deleteController)

module.exports = router

