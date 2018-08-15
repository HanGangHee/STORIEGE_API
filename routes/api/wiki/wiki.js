
import {Router} from 'express'

import createController from './create.controller'
import deleteController from './delete.controller'
import readController from './read.controller'
import updateController from './update.controller'

const router = Router()

router.get('/', readController)
router.put('/', updateController)
router.post('/', createController)
router.delete('/', deleteController)

module.exports = router

