
import {Router} from 'express'
import user from './user/user'
import wiki from './wiki/wiki'

const router = Router()

router.use('/user', user)
router.use('/wiki', wiki)
module.exports = router

