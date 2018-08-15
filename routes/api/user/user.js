
import {Router} from 'express'

import deleteController from './delete.controller'
import updateController from './update.controller'

const router = Router()

router.put('/', updateController)
router.delete('/', deleteController)

module.exports = router

