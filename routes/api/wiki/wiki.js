
import {Router} from 'express'

import createController from './create.controller'
import deleteController from './delete.controller'
import readController from './read.controller'
import contentUpdate from './update/contentUpdate'
import titleUpdate from './update/titleUpdate'
import parentUpdate from './update/parentUpdate'
import likeUpdate from './update/likeUpdate'

import authMiddleware from "../../../middlewares/auth"
const router = Router()

router.get('/:num', authMiddleware, readController)

router.put('/content/:num', authMiddleware, contentUpdate)
router.put('/like/:num', authMiddleware, titleUpdate)
router.put('/title/:num', authMiddleware, parentUpdate)
router.put('/parent/:num', authMiddleware, likeUpdate)

router.post('/', authMiddleware, createController)
router.delete('/:num',authMiddleware, deleteController)

module.exports = router

